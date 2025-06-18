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
    const res = await axios.post("http://localhost:4000/expense/add", data);
    console.log(res);
    inintialize();
  } catch (error) {
    console.log(error);
  }
  event.target.amount.value = "";
  event.target.description.value = "";
  event.target.category.value = "";
};

async function display(item) {
  const ul = document.querySelector("ul");

  const li = document.createElement("li");
  const del = document.createElement("button");

  li.innerText = `${item.amount}-${item.description}-${item.category}`;

  del.innerText = "delete";

  try {
    del.addEventListener("click", async () => {
      await axios.delete(`http://localhost:4000/expense/${item.id}`);
      console.log("ggggggggggggg");
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

  try {
    const expenses = await axios.get("http://localhost:4000/expense");
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
