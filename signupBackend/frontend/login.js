const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const res = await axios.post("http://localhost:4000/user/login", data);

    alert(res.data.msg);
  } catch (error) {
    alert(error.response.data.msg);
    console.log(error.response.data.msg);
  }

  event.target.email.value = "";
  event.target.password.value = "";
};
