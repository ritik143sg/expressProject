const p = document.querySelector("p");

setInterval(() => {
  p.innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
}, 1000);

const display = (item) => {
  console.log(item);

  const div0 = document.getElementById("values");
  const div1 = document.createElement("div");
  div1.className = "excel-row";

  for (let key in item) {
    const div2 = document.createElement("div");
    div2.className = "excel-cell";
    if (key == "updatedAt")
      div2.innerText = `${item["updatedAt"].slice(0, 10)}`;
    else if (key == "description") div2.innerText = `${item["description"]}`;
    else if (key == "category") div2.innerText = `${item["category"]}`;
    else if (key == "amount") div2.innerText = `${item["amount"]}`;
    else if (key == "createdAt")
      div2.innerText = `${item["createdAt"].slice(0, 10)}`;
    else continue;

    div1.appendChild(div2);
  }
  div0.appendChild(div1);
};

const initialize = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const result = await axios.get("http://localhost:4000/expense", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const items = result.data.expense;

    console.log(result.data.expense);
    items.map((item) => {
      display(item);
    });
  } catch (error) {
    console.log(error);
  }
};

initialize();
