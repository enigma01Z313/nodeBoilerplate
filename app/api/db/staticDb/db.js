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
  bookStatus: [
    {
      code: 0,
      label: "در حال بررسی",
      color: "red",
      bg: "red",
    },
    {
      code: 1,
      label: "منتشر شده",
      color: "red",
      bg: "red",
    },
    {
      code: 1,
      label: "غیر فعال شده",
      color: "red",
      bg: "red",
    },
  ],
  authorTypes: [
    {
      code: 1,
      label: "نویسنده",
      key: "writer",
    },
    {
      code: 2,
      label: "مالف",
      key: "author",
    },
    {
      code: 3,
      label: "مترجم",
      key: "translator",
    },
    {
      code: 4,
      label: "محقق",
      key: "resercher",
    },
    {
      code: 5,
      label: "گوینده",
      key: "narrator",
    },
  ],
  offPriceTypes: [
    { code: 1, label: "درصدی", key: "percent" },
    { code: 2, label: "قیمت", key: "amount" },
  ],
  fileTypes: [
    { code: 1, label: "فایل pdf", key: "pdf" },
    { code: 2, label: "فایل epub", key: "epub" },
    { code: 3, label: "فایل صوتی", key: "sound" },
  ]
};

module.exports = statusList;
