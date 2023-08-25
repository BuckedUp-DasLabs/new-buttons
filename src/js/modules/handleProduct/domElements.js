const createButton = (optionId, valueId, valuePrice, src, text) => {
  const wrapper = document.createElement("div");
  const img = document.createElement("img");
  const label = document.createElement("label");
  const labelText = document.createElement("span");
  const labelBall = document.createElement("span");
  const button = document.createElement("input");
  const labelContent = document.createElement("span")
  wrapper.appendChild(button)
  wrapper.appendChild(label)
  label.appendChild(img)
  label.appendChild(labelContent)
  labelContent.appendChild(labelBall)
  labelContent.appendChild(labelText)

  labelContent.classList.add("label")
  wrapper.classList.add("button-wrapper")
  labelText.classList.add("label-text")
  labelBall.classList.add("label-ball")
  img.src = src
  label.setAttribute("for", `${optionId}-${valueId}`);
  label.setAttribute("role", "button");
  labelText.innerHTML = text;
  button.id = `${optionId}-${valueId}`;
  button.value = `${optionId}-${valueId}`;
  button.name = optionId;
  button.setAttribute("price", valuePrice);
  button.setAttribute("label-text", text);
  button.type = "radio";
  button.setAttribute("hidden", "");

  return [wrapper, button];
};


export { createButton };
