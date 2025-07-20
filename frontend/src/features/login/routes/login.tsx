
import { TextInput } from "../../../components/ui/text-input";
import { Button } from "../../../components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from "@/features/auth/hooks";
import { LoginDto, loginSchema } from "../schemas";
import { useLogin } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/libs";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";
import { Text } from "@mantine/core";

export const Login = () => {
  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      rememberMe: false,
    },
  });

  const { onLogin } = useAuth();
  const { mutate, isPending: isLoading } = useLogin();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    mutate(data, {
      onSuccess: (data) => {
        try {
          const { user, token } = data; 
          onLogin({ data: user, token }); 
          toast.success({ message: 'Login Successful!' });
          navigate('/');
        } catch (err) {
          console.error('Login context error:', err);
        }
      }
      
     
    });
  });

  return (
    <div className="mx-auto m-7 flex flex-col bg-white p-10 border-r-2 gap-5 rounded-lg max-w-md">
    
      <Text className="text-lg font-semibold text-center">
        {('Welcome! Please login with your email')}
      </Text>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <TextInput
            label={('Email')}
            placeholder={('Enter Email')}
            registration={register('email')}
            error={errors.email?.message}
          />
          <PasswordInput
            label={('Password')}
            placeholder={('Enter Password')}
            registration={register('password')}
            error={errors.password?.message}
          />
          <div className="flex justify-between items-center">
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { value, onChange } }) => (
                <Checkbox label={('Remember Me')} checked={!!value} onChange={onChange} />
              )}
            />
          </div>
          <Button type="submit" loading={isLoading}>
            {('Login')}
          </Button>
        </div>
      </form>
    </div>
  );
};
