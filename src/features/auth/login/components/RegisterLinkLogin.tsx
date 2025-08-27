import { Link } from 'react-router-dom';
const RegisterLink = () => {
  return (
    <div className="text-center">
      <p className="text-[#8c7158]">
        Belum punya akun?{' '}
        <Link
          to="/auth/register"
          className="font-medium text-[#6f4e37] hover:text-[#a67c52]"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
};
export default RegisterLink;
