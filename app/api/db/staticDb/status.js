const statusList = {
  defaultStatus: [
    {
      code: 0,
      label: "غیر فعال",
      color: "red",
      bg: "red",
    },
    {
      code: 1,
      label: "فعال",
      color: "green",
      bg: "green",
    },
  ],
  paymentStatus: [
    {
      code: 1,
      label: "در انتظار پرداخت",
      color: "yellow",
      bg: "lightgoldenrodyellow",
    },
    {
      code: 2,
      label: "کنسل شده",
      color: "red",
      bg: "orangered",
    },
    {
      code: 3,
      label: "پرداخت شده",
      color: "green",
      bg: "darkseagreen",
    },
  ],
  journalStatus: [
    {
      code: 1,
      label: {
        fa: "جاری",
        en: "Ongoing",
      },
      color: "yellow",
      bg: "lightgoldenrodyellow",
    },
    {
      code: 2,
      label: "کنسل شده",
      label: {
        fa: "کنسل شده",
        en: "Cancelled",
      },
      color: "red",
      bg: "orangered",
    },
    {
      code: 3,
      label: "موفق",
      label: {
        fa: "موفق",
        en: "Success",
      },
      color: "green",
      bg: "darkseagreen",
    },
    {
      code: 4,
      label: {
        fa: "نا موفق",
        en: "Failed",
      },
      color: "green",
      bg: "darkseagreen",
    },
  ],
};

module.exports = statusList;
