import { Link } from 'react-router-dom';
const LoginLinkRegister = () => {
  return (
    <div className="text-center">
      <p className="text-[#8c7158]">
        Sudah punya akun?{' '}
        <Link
          to="/auth/login"
          className="font-medium text-[#6f4e37] hover:text-[#a67c52]"
        >
          Masuk di sini
        </Link>
      </p>
    </div>
  );
};
export default LoginLinkRegister;
