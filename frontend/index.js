const handleSubmit = async (event) => {
  event.preventDefault();

  console.log(event.target);

  const data = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const res = await axios.post("http://localhost:4000/user/signup", data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  event.target.username.value = " ";
  event.target.email.value = " ";
  event.target.password.value = " ";
};
