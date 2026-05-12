const quantityInput = document.querySelector("#quantity");
const estimateText = document.querySelector("#estimateText");
const requestForm = document.querySelector("#requestForm");
const formNote = document.querySelector("#formNote");

const blockWeightTons = 1.96;
const truckCapacityTons = 20;

function formatNumber(value) {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 1,
  }).format(value);
}

function updateEstimate() {
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const totalWeight = quantity * blockWeightTons;
  const trucks = Math.max(1, Math.ceil(totalWeight / truckCapacityTons));
  const blockWord = quantity === 1 ? "блок" : quantity < 5 ? "блока" : "блоков";
  const truckWord = trucks === 1 ? "машина" : trucks < 5 ? "машины" : "машин";

  estimateText.textContent = `${quantity} ${blockWord} · ${formatNumber(totalWeight)} т · ${trucks} ${truckWord} до 20 т`;
}

quantityInput.addEventListener("input", updateEstimate);

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(requestForm);
  const quantity = formData.get("quantity") || "не указано";
  const location = formData.get("location") || "адрес не указан";

  formNote.textContent = `Параметры для расчета: ${quantity} шт., ${location}. Менеджер уточнит поставку и итоговую стоимость.`;
});

updateEstimate();
