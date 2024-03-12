'use server'
import renderLogoInline from "@/app/components/common/logos/LogoInline";
import SignUpForm from "../../_components/auth/SignupForm";
import Image from "next/image";

// FTM-2 1. Register as a new user

const SignupPage = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mx-auto py-10 xl:w-3/4 lg:w-10/12 md:w-10/12 sm:w-full ">
      {/* Desktop-only image */}
      <section className="hidden md:block">
        <Image
          src="/images/undraw_sign_up.svg"
          alt="Image"
          width={500} 
          height={300} 
          className="object-cover"
        />
      </section>
      <section className="flex flex-col justify-center items-center w-full ">
        <div className="py-5">
          <h2 className="text-3xl font-bold text-center py-10">Welcome</h2>
          <div className="flex items-center justify-center">
            <h3 className="text-lg align-text-bottom">Create your &nbsp;</h3>
            <span className="inline-block align-text-bottom"> 
             {renderLogoInline()}
            </span>
            <h3 className="text-lg align-text-bottom">&nbsp; profile.</h3></div>
          </div>
          <SignUpForm />
      </section>
    </main>
  );
};

export default SignupPage;