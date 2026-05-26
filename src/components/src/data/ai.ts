export function getAIResponse(
  message: string,
  products: any[]
) {

  const text =
    message.toLowerCase();

  // ================= PHONE =================

  if (
    text.includes("phone") ||
    text.includes("iphone") ||
    text.includes("телефон")
  ) {

    const filtered =
      products.filter((item) =>
        item.productName
          ?.toLowerCase()
          .includes("phone")
      );

    return {
      text: "I found phones for you 📱",
      products: filtered,
    };
  }

  // ================= LAPTOP =================

  if (
    text.includes("laptop") ||
    text.includes("ноут")
  ) {

    const filtered =
      products.filter((item) =>
        item.productName
          ?.toLowerCase()
          .includes("laptop")
      );

    return {
      text: "Best laptops 💻",
      products: filtered,
    };
  }

  // ================= CHEAP =================

  if (
    text.includes("cheap") ||
    text.includes("cheap products") ||
    text.includes("дешево")
  ) {

    const filtered =
      [...products]
        .sort(
          (a, b) =>
            a.price - b.price
        )
        .slice(0, 4);

    return {
      text: "Cheap products 💸",
      products: filtered,
    };
  }

  // ================= DISCOUNT =================

  if (
    text.includes("discount") ||
    text.includes("sale") ||
    text.includes("скидка")
  ) {

    const filtered =
      products.filter(
        (item) =>
          item.hasDiscount
      );

    return {
      text: "Products with discount 🔥",
      products: filtered,
    };
  }

  // ================= DEFAULT =================

  return {
    text: "Try: phones, laptop, cheap products, discount",
    products: [],
  };
}