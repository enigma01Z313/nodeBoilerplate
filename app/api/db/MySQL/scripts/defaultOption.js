const defaultPermissions = [
  {
    name: "مدیرت نقش ها",
    permissions: [
      {
        lable: "نمایش نقش ها",
        permission: "SEE_ROLES",
      },
      {
        lable: "افزودن نقش جدید",
        permission: "ADD_ROLES",
      },
      {
        lable: "ویرایش نقش ها",
        permission: "EDIT_ROLES",
      },
    ],
  },
  {
    name: "مدیرت کاربران",
    permissions: [
      {
        lable: "نمایش کابران",
        permission: "SEE_USERS",
      },
      {
        lable: "افزودن کابر",
        permission: "ADD_USERS",
      },
      {
        lable: "ویرایش کابران",
        permission: "EDIT_USERS",
      },
    ],
  },
  {
    name: "پیشخوان مدیریت",
    permissions: [
      {
        lable: "مدیریت همه پورتفولیو",
        permission: "MANAGE_ALL_PORTFOLIOS",
      },
      {
        lable: "مدیریت همه ژورنال",
        permission: "MANAGE_ALL_JOURNALS",
      },
      {
        lable: "مدیریت هم واچلیست",
        permission: "MANAGE_ALL_WATCHLISTS",
      },
      {
        lable: "مدیریت پورتفولیو",
        permission: "MANAGE_PORTFOLIOS",
      },
      {
        lable: "مدیریت ژورنال",
        permission: "MANAGE_JOURNALS",
      },
      {
        lable: "مدیریت واچلیست",
        permission: "MANAGE_WATCHLISTS",
      },
      {
        lable: "مدیریت پکیج ها",
        permission: "MANAGE_PACKAGES",
      },
      {
        lable: "نمایش پورتفولیو",
        permission: "SEE_PORTFOLIOS",
      },
      {
        lable: "نمایش ژورنا ها",
        permission: "SEE_JOURNALS",
      },
      {
        lable: "نمایش پکیج ها",
        permission: "SEE_PACKAGES",
      },
      {
        lable: "نمایش واچلیست ها",
        permission: "SEE_WATCHLISTS",
      },
    ],
  },
];

module.exports = defaultPermissions;
