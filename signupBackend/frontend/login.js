const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const res = await axios.post("http://localhost:4000/user/login", data);

    const token = res.data.token;

    localStorage.setItem("token", JSON.stringify(token));

    alert(res.data.msg);
    window.location.href = "./expense.html";
  } catch (error) {
    alert(error.response.data.msg);
    console.log(error.response.data.msg);
  }

  event.target.email.value = "";
  event.target.password.value = "";
};
