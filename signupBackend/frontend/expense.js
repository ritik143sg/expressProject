const handleSubmit = async (event) => {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  console.log(amount, description, category);
  const data = {
    amount: amount,
    description: description,
    category: category,
  };

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post("http://localhost:4000/expense/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    inintialize();
  } catch (error) {
    console.log(error);
  }
  event.target.amount.value = "";
  event.target.description.value = "";
};

async function display(item) {
  const ul = document.querySelector("ul");

  const li = document.createElement("li");
  const del = document.createElement("button");

  li.innerText = `${item.amount}-${item.description}-${item.category}`;

  del.innerText = "delete";

  try {
    del.addEventListener("click", async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios.delete(`http://localhost:4000/expense/delete/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      inintialize();
    });
  } catch (error) {
    console.log(error);
  }

  li.appendChild(del);
  ul.appendChild(li);
}

async function inintialize() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  const premiumButton = document.getElementById("premium");

  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const result = await axios.get("http://localhost:4000/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const status = result.data.order.OrderStatus;

    console.log(status);

    if (status == "Success") {
      const form = document.querySelector("form");

      if (premiumButton) {
        form.removeChild(premiumButton);

        const premium = document.createElement("button");
        premium.style.backgroundColor = "rgb(236, 101, 124)";
        premium.innerText = "You are a Premium User";
        premium.id = "Premium";
        premium.addEventListener("click", () => {
          alert("Already A Premium User");
        });
        form.appendChild(premium);
      }
    }

    const expenses = await axios.get("http://localhost:4000/expense", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(expenses);
    const items = expenses.data.expense;

    items.map((item) => {
      display(item);
    });
  } catch (error) {
    console.log(error);
  }
}

inintialize();
