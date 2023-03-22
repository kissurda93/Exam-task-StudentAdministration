export const concatLink = (link, checkBoxStateObject, nameValue) => {
  let newLink = link;

  for (const key in checkBoxStateObject) {
    const element = checkBoxStateObject[key];
    newLink += `${key}=${element}&`;
  }

  if (nameValue !== "") {
    newLink += `name=${nameValue}`;
    return newLink;
  }

  return newLink;
};

export const upperCase = (string) =>
  string[0].toUpperCase() + string.substring(1);
