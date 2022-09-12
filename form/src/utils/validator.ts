const contactForm = {
  phoneNumber: (phoneNumber: string) => {
    phoneNumber = phoneNumber.replaceAll("(", "");
    phoneNumber = phoneNumber.replaceAll(")", "");
    phoneNumber = phoneNumber.replaceAll(" ", "");
    if (phoneNumber.length === 0) {
      return "Insira um número de telefone";
    }
    if (
      !/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/gm.test(
        phoneNumber
      )
    ) {
      return "Insira um número de telefone válido";
    }
    return undefined;
  },
};

export default { contactForm };
