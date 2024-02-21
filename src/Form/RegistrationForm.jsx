// RegistrationForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import { FcGoogle } from "react-icons/fc";
import { TfiApple } from "react-icons/tfi";
import { IoLogoGithub } from "react-icons/io";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setTimeout(() => {
      navigate("/", { state: { userName: data.name } });
    }, 2000);
  };

  const handleOnclick = () => {
    navigate("/");
  };

  return (
    <div className={styles.formContainer}>
      <div>
        <img
          onClick={handleOnclick}
          src="https://kalvium.community/images/sidebar-3d-logo.svg"
          style={{
            height: "60px",
            width: "60px",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "20px",
          }}
          alt="Logo"
        ></img>
        {isSubmitSuccessful ? (
          <h2
            style={{
              color: "#adc178",
              fontSize: "40px",
              fontWeight: "bolder",
              textAlign: "center",
              marginTop: "-20px",
            }}
          >
            Registration successful!
          </h2>
        ) : (
          <p
            style={{
              color: "#adc178",
              fontSize: "40px",
              fontWeight: "bolder",
              textAlign: "center",
              marginTop: "-20px",
            }}
          >
            Create Account
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBoxContainer}>
          <input
            placeholder="Enter your Name"
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must be less than 30 characters",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <input
            placeholder="Enter your Email Address"
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            placeholder="Enter your Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 10,
                message: "Password must be at least 10 characters",
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*])/,
                message: "Password must contain at least one special character",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            placeholder="Repeat your password"
            type="password"
            {...register("repeatPassword", {
              required: "Repeat Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
        </div>
        <button
          className={styles.SubmitBtn}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div
        style={{
          height: "10px",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginLeft: "40px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.359)",
        }}
      ></div>
      <p style={{ color: "black", textAlign: "center" }}>
        Or <strong>Sign Up</strong> with
      </p>
      <div className={styles["socialLogoContainer"]}>
        <FcGoogle className={styles["googleLogo"]} />
        <TfiApple className={styles["appleLogo"]} />
        <IoLogoGithub className={styles["githubLogo"]} />
      </div>
    </div>
  );
};

export default RegistrationForm;
