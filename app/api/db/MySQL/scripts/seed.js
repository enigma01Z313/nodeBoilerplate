"use strict";

const crypto = require("crypto");
const {
  Option,
  Role,
  User,
  UserMeta,
  Tag,
  Book,
  Category,
  Author,
  BookAuthor,
  Book_tag,
  Book_category,
  Off_price,
  File,
} = require("../models");
const models = require("../models");

const defaultPermissions = require("./defaultOption");
const hash = require("../../../src/utils/hash");

const listPermissions = (obj) => {
  const listPermissions = [];
  for (const { permissions } of obj) {
    for (const { permission } of permissions) {
      listPermissions.push(permission);
    }
  }

  return JSON.stringify(listPermissions);
};
const password = hash("1230");

const imageUUID1 = "42fc95de-886e-4c80-85ca-25ad9dc8c3a9";
const imageUUID2 = "83604c59-1c37-4406-83b0-72d84d963a69";
const imageUUID3 = "d8990d0f-27a2-4181-acad-d1062348e75e";
const imageUUID4 = "8b77d3fc-1b07-4d43-8d4c-efa498998353";
const imageUUID5 = "7ed6f26e-4600-4d38-9840-b6400dcfdebb";
const imageUUID6 = "0f861f7f-1e95-4ef3-bc02-2f4a58caa0e5";
const imageUUID7 = "0f861f7f-1e95-4f83-bc02-2f4a58caa0e5";
const imageUUID8 = "0f861f7f-1e95-96f3-bc02-2f4a58caa0e5";
const imageUUID9 = "0f861f7f-1e95-96f3-bc02-245a58caa0e5";
const imageUUID10 = "0f861t8f-1e95-96f3-bc02-2f4a58caa0e5";
const imageUUID11 = "0f861f7f-1e95-969y-bc02-2f4a58caa0e5";
const imageUUID12 = "0f861f7f-7e95-96f3-bc02-2f4a58caa0e5";
const imageUUID13 = "0f861f7f-7e95-98s3-bc02-2f4a58caa0e5";
(async function () {
  // Positions
  await Option.bulkCreate([
    {
      key: "permissions",
      value: JSON.stringify(defaultPermissions),
    },
  ]);
  console.log("Options seed has been finished");

  // Roles
  await Role.bulkCreate([
    {
      uuid: crypto.randomUUID(),
      name: "USER1",
      permissions: listPermissions(defaultPermissions),
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      name: "ادمین",
      permissions: listPermissions(defaultPermissions),
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      name: "کاربر",
      permissions: ["SEE_ROLES"],
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      name: "انتشارات",
      permissions: ["ADD_ROLES"],
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log("Roles seed has been finished");

  //Users
  await User.create({
    uuid: crypto.randomUUID(),
    phone: "09333950889",
    email: "f.ahmadyf94@gmail.com",
    password,
    firstName: "فرزین",
    lastName: "احمدی",
    roleId: 1,
    imageId: 1,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await User.bulkCreate([
    {
      uuid: crypto.randomUUID(),
      phone: "09903696246",
      email: "faezeh92eh@gmail.com",
      password,
      firstName: "فائزه",
      lastName: "احسانی",
      roleId: 2,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09107541126",
      email: "mohammad@gmail.com",
      password,
      firstName: "محمد",
      lastName: "تخت کشها",
      roleId: 2,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09198410970",
      email: "saeed@gmail.com",
      password,
      firstName: "سعید",
      lastName: "گیوکی",
      roleId: 2,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09300585885",
      email: "negar@gmail.com",
      password,
      firstName: "نگار",
      lastName: "عالیزاده",
      roleId: 2,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09127676895",
      email: "minaAhmadzade@gmail.com",
      password,
      firstName: "مینا",
      lastName: "احمدزاده",
      roleId: 3,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09127676895",
      email: "minaAhmadzade@gmail.com",
      password,
      firstName: "انتشارات نشر قلم",
      lastName: "",
      roleId: 4,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09127676895",
      email: "minaAhmadzade@gmail.com",
      password,
      firstName: "قلمچی",
      lastName: "",
      roleId: 4,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      uuid: crypto.randomUUID(),
      phone: "09100000000",
      email: "t1@m.com",
      password,
      firstName: "نشر نی",
      lastName: "",
      roleId: 4,
      imageId: 1,
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  console.log("User seed has been finished");

  //UserMeta
  await UserMeta.bulkCreate([
    {
      key: "رنگ مورد علاقه",
      value: "آبی",
      userId: 1,
    },
    {
      key: "ورزش مورد علاقه",
      value: "بوکس",
      userId: 2,
    },
  ]);
  console.log("UserMeta seed has been finished");

  //Books
  await Book.bulkCreate([
    {
      name: "باشگاه پنج صبحی ها",
      publishedYear: 1395,
      content: "test",
      price: 1300,
      publisherId: 7,
      status: 1,
      image: imageUUID1,
    },
    {
      name: "جرئت داشته باش",
      publishedYear: 1390,
      content: "test",
      price: 1300,
      publisherId: 7,
      status: 1,
      image: imageUUID2,
    },
    {
      name: "قلعه حیوانات",
      publishedYear: 1340,
      content: "test",
      price: 1300,
      publisherId: 5,
      status: 1,
      image: imageUUID3,
    },
    {
      name: "تاریخ ایران مدرن",
      publishedYear: 1340,
      content: `
        <p>کتاب&nbsp;<b>تاریخ ایران مدرن</b> نوشتهٔ <b>یرواند آبراهامیان</b> و ترجمهٔ <b>محمدابراهیم فتاحی</b> است. <b>نشر نی</b> این کتاب را روانهٔ بازار کرده است.</p><h2>درباره کتاب&nbsp;تاریخ ایران مدرن</h2><p>کتاب&nbsp;<b>تاریخ ایران مدرن</b>&nbsp;با هدف آشنایی مخاطبان با کلیات و روندهای عمدهٔ تاریخ معاصر ایران طی ۲ سدهٔ اخیر تدوین شده است. بر این اساس به جزئیات رویدادها چندان اشاره نشده است. تمرکز اساسی نویسنده ذکر رویدادهای عمدهٔ تاریخی و سپس جمع&zwnj;بندی و تحلیل آن&zwnj;ها بوده است؛ بنابراین برای خوانندگانی که در نظر دارند تصویری فراگیر و جامع از روندهای تاریخی سدهٔ اخیر و تحلیل آن&zwnj;ها به دست آورند (به&zwnj;ویژه دانشجویان و دیگر علاقه&zwnj;مندان به تاریخ ایران معاصر) سودمند و خواندنی است.</p><p><b>یرواند آبراهامیان</b>&nbsp;در ارزیابی ریشه&zwnj;ای تاریخ معاصر ایران مدرن، افزون بر بررسی جامع سدهٔ بیستم، موضوعاتی نظیر اکتشاف نفت، دخالت&zwnj;های خارجی، نقش دودمان پهلوی و همچنین انقلاب ۱۳۵۷ و زایش جمهوری اسلامی را موردواکاوی دوباره قرار داده است. ایران در این بین تجربیات دیگری را نیز از سر گذرانده است که از جمله می&zwnj;بایست به جنگ با عراق، دگرگونی&zwnj;های جامعه در ۳ دههٔ اخیر و از همه تازه&zwnj;تر، توسعه و گسترش دولت و مبارزه برای قدرت در میان نخبگان قدیمی، روشنفکران و طبقهٔ متوسط تجاری اشاره کرد.</p><p>این نویسنده که یکی از ممتازترین تاریخ&zwnj;نویسان ایران کنونی به شمار می&zwnj;رود، در این اثر هم&zwnj;زمان با بررسی فرازونشیب&zwnj;های سیاست&zwnj;های بین&zwnj;المللی و منطقه&zwnj;ای کشور، با چیرگی هرچه تمام&zwnj;تر مردم ایران را در کانون توجه خود قرار داده است؛ مردمی که طی یک سده تحمل جنگ و انقلاب همچنان به بقای خود ادامه داده&zwnj;اند. این کتاب در واقع به این مردم و نیز انعطاف&zwnj;پذیری آنان هم&zwnj;زمان با ظهور این کشور به&zwnj;مثابهٔ یکی از توانمندترین قدرت&zwnj;های خاورمیانه، تقدیم شده است.<br></p><h2>خواندن کتاب&nbsp;تاریخ ایران مدرن را به چه کسانی پیشنهاد می&zwnj;کنیم</h2><p>خواندن این کتاب را به دوستداران تاریخ مدرن ایران پیشنهاد می&zwnj;کنیم.</p><h2>درباره یرواند آبراهامیان</h2><p><b>یرواند آبراهامیان</b> در سال ۱۳۱۹ در تهران به دنیا آمد. او تاریخ&zwnj;نگار ایرانی - امریکایی و ایرانیِ ارمنی&zwnj;تبار&nbsp;<span>و استاد ممتاز تاریخ در کالج باروک دانشگاه شهر نیویورک</span><span>&nbsp;است. او آثار قابل&zwnj;توجهی دربارهٔ تاریخ معاصر ایران نوشته که کتاب «ایران بین دو انقلاب» از پرآوازه&zwnj;ترین آن&zwnj;هاست. در دههٔ ۱۹۷۰ میلادی، آبراهامیان از فعالان و اعضای کنفدراسیون جهانی محصلین و دانشجویان ایرانی بود که با حکومت محمدرضا پهلوی مخالف بودند؛ او همچنین در سال ۱۳۵۴ (۱۹۷۶ میلادی) در نیویورک نایب&zwnj;رئیس «کمیتهٔ برای آزادی هنر و اندیشه در ایران (CAIFI)» به&zwnj;عنوان بخشی از «حزب کارگران سوسیالیست» بود.</span></p><p><span>بعضی از آثار مکتوب او عبارتند از:</span><br></p><p>«ایران بین دو انقلاب»، «<b>تاریخ ایران مدرن</b>»، «کودتا»، «اسلام رادیکال: مجاهدین ایرانی»، «خمینیسم (مقالاتی دربارهٔ جمهوری اسلامی)»، «اعترافات شکنجه&zwnj;شدگان، زندان&zwnj;ها و ابراز ندامت&zwnj;های علنی در ایران مدرن»، «مردم در سیاست ایران»، «مقالاتی در جامعه&zwnj;شناسی ایران»، «پارانوید در سیاست ایران؛ از کتاب جستارهایی دربارهٔ تئوری توطئه در ایران»، «آنارشیسم در انقلاب روسیه»، «یک آنارشیست آمریکایی؛ زندگی والترین کلیر».</p><h2>بخشی از کتاب&nbsp;تاریخ ایران مدرن</h2><p>«<span>در این باب که اگر چنین&zwnj;وچنان می&zwnj;شد شاید انقلاب به وقوع نمی&zwnj;پیوست، گمانه&zwnj;زنی&zwnj;های فراوانی شده است: اگر شاه در سرکوب یا کنار آمدن با مخالفان قاطعانه&zwnj;تر عمل می&zwnj;کرد؛ اگر دچار سرطان نبود؛ اگر مشاوران قدرتمند وی همچنان زنده بودند؛ اگر این همه هزینه به&zwnj;جای تسلیحات پیشرفته نظامی صرف تجهیزات مقابله با تظاهرات&zwnj;کنندگان می&zwnj;شد؛ اگر مقامات ارشد ارتش اندکی حمیت کاری نشان می&zwnj;دادند؛ اگر سازمان&zwnj;های حقوق بشری موی دماغ شاه نمی&zwnj;شدند؛ اگر سازمان سیا پس از دهه ۱۳۳۰/۱۹۵۰ به&zwnj;دقت کشور را زیر نظر می&zwnj;گرفت؛ اگر کاخ سفید دیپلمات&zwnj;هایی را که خودسانسوری می&zwnj;کردند نادیده می&zwnj;گرفت و به هشدارهای صریح دانشگاهیان بدبین به&zwnj;دقت توجه می&zwnj;کرد؛ و اگر در مرحله نهایی، واشنگتن در حمایت از شاه منسجم&zwnj;تر بود، یا برای برقراری ارتباط با (آیت&zwnj;الله) خمینی تلاش نمی&zwnj;کرد. واشنگتن بی&zwnj;درنگ پس از وقوع انقلاب با این پرسش مواجه شد که «چه کسی بابت از دست رفتن ایران مقصر بود؟» در این مورد، برخی رئیس&zwnj;جمهور کارتر، برخی سازمان سیا و بعضی هم شاه و ژنرال&zwnj;هایش را مقصر دانستند. البته چنین گمانه&zwnj;زنی&zwnj;هایی همان&zwnj;قدر بی&zwnj;معناست که بگوییم اگر صندلی&zwnj;های روی عرشه تایتانیک جور دیگری چیده می&zwnj;شدند، این کشتی غول&zwnj;پیکر غرق نمی&zwnj;شد.</span></p><p><span>فوران انقلاب صرفاً به سبب اشتباهات لحظات آخر نبود. آتشفشان انقلاب ناشی از فشارهای بیش از اندازه&zwnj;ای بود که دهه&zwnj;های متمادی در اعماق جامعه ایران انباشته شده بود. شاه در ۱۳۵۶/۱۹۷۷، عملا روی چنین آتشفشانی قرار داشت و تقریباً با همه بخش&zwnj;های جامعه بیگانه بود. او حکومت خودکامه&zwnj;اش را با مخالفت شدید روشنفکران و طبقه کارگر شهری آغاز کرد. این مخالفت طی سال&zwnj;های متمادی تشدید و تقویت شد. او در عصر جمهوری&zwnj;خواهی با سلطنت، پادشاهی و پهلوی&zwnj;گرایی خودنمایی می&zwnj;کرد و به آن&zwnj;ها جلوه می&zwnj;فروخت و در عصر ناسیونالیسم و مخالفت با امپریالیسم، با دخالت مستقیم سازمان&zwnj;های سیا و MI۶ در سرنگونی دولت مصدق ــ نماد و درواقع بت ناسیونالیسم ایرانی ــ به قدرت رسیده بود. شاه همچنین در عصر بی&zwnj;طرفی، رویکردهای غیرمتعهدانه و جهان&zwnj;سوم&zwnj;گرایی را به تمسخر می&zwnj;گرفت. درمقابل خود را پلیس (ژاندارم) امریکا در خلیج فارس می&zwnj;دانست و در موضوعات حساسی همچون فلسطین و ویتنام آشکارا از امریکا جانبداری می&zwnj;کرد. و سرانجام این&zwnj;که، شاه در روزگار دموکراسی، درخصوص فضیلت&zwnj;هایی مانند نظم، انضباط، رهبری، پادشاهی و ارتباط شخصی با خداوند، سخن&zwnj;فرسایی می&zwnj;کرد.</span>»</p>
      `,
      price: 140000,
      publisherId: 6,
      status: 1,
      image: imageUUID4,
    },
    {
      name: "آیسخولوس",
      publishedYear: 1340,
      content: `
<h2 class="bookDescription_bookDescriptionHeader__2BZou">معرفی کتاب آیسخولوس</h2><div class="bookDescription_bookDescriptionContent__BKsT2"><p><b>مجموعه آثار آیسخولوس </b>ترجمهٔ<b> عبدالله  کوثری </b>است و نشر <b>نی </b>آن را منتشر کرده است.</p><h2>درباره کتاب آیسخولوس </h2><p><b>آیسخولوس </b>یا اِشیل یا اسکیلس اولین تراژدی&zwnj;نویس یونان باستان است و آثار او باعث تکامل زبان تراژدی در یونان باستان شد. در جنگ ایران و یونان در زمان حکومت خشایارشا که یونان پیروز شد حضور داشت و نمایشنامه ایرانیان (پارسیان) را با تاثیر از آن مینویسد.</p><p>هفت نمایشنامه تراژدی پارسیان، پرومته در زنجیر، هفت تن علیه تبای، نیازگاران، آگاممنون، الاهگان انتقام و اورستیا از وی به جا مانده&zwnj; است.</p><p>منابع باستانی هفتاد تا نود نمایشنامه را به <b>آیسخولوس </b>نسبت می&zwnj;دهند. اما فهرست آثار شناخته&zwnj;شده ازجمله نمایشنامه&zwnj;های پرومتئوسی که هویت نویسنده&zwnj;شان مورد اختلاف است، کمی بیش از هشتاد است. اگر احتمال ازمیان&zwnj;رفتن برخی نمایشنامه&zwnj;های ساتیری و برخی کارهای دیگر را درنظر داشته باشیم، کل آثار او را می&zwnj;توان هشتاد نمایشنامه برآورد کرد. این بدان معناست که آیسخولوس کم&zwnj;وبیش در طول چهل سال فعالیت حدود بیست&zwnj;ویک اثر (هر کدام مرکب از سه نمایشنامه و یک نمایشنامه ساتیری) بر صحنه برده است.&nbsp;</p><p>شش نمایشنامه محرز آیسخولوس همگی حاصل نیمه دوم دوران نویسندگی اوست (۴۷۲ ـ ۴۵۸) و ما هیچ راهی نداریم تا برآورد کنیم کارهای اولیه او چگونه بوده و برداشت او از نمایشنامه و اجرای آن در طول چهل سال فعالیت چگونه تحول یافته است.&nbsp;</p><p>نمایشنامه&zwnj;هایی را که در این کتاب آمده&zwnj;اند از این قرار هستند:</p><p><b>۱: اورستیا</b> (سه&zwnj;گانه&zwnj;ای از تراژدی&zwnj;های آگاممنون، نیازآوران و الاهگان)<br></p><p>تریلوژی اورستیا، بخشی از سرنوشت غمبار خاندان شاهی آترئوس را روایت می&zwnj;کند.&nbsp;<span>نیای بزرگ این خاندان تانتالوس پسر زئوس بود. او در نزد ایزدان جایگاهی برتر از همه فرزندان میرای زئوس داشت، چندان&zwnj;که بر سفره آنان می&zwnj;نشست و از خوراک و شراب آسمانی ایشان می&zwnj;خورد. این بزرگداشت تا بدان&zwnj;جا کشید که ایزدان دعوت تانتالوس را پذیرفتند و به مهمانی او رفتند. تانتالوس به کاری شگفت و زشت برخاست. فرزند خود پلوپس را کشت و از جسد او خوراکی برای ایزدان پخت. شاید می&zwnj;خواست نشان دهد که ایزدانی چنان پرهیبت چه آسان فریب می&zwnj;خورند. اما ایزدان به جنایت او پی بردند و نفرینش کردند. مجازات او این شد که در برکه&zwnj;ای در هادس (دنیای مردگان) بایستد و هرگاه از عطش تاب&zwnj;سوز به جان می&zwnj;آمد و دست به سوی آب می&zwnj;برد، آب برکه خشک می&zwnj;شد. نیز درختان میوه&zwnj;ای که بر فراز برکه بودند چون او به تمنای میوه&zwnj;ای دست فراز می&zwnj;کرد، شاخه&zwnj;های خود را چندان بالا می&zwnj;افراشتند که دست او به آن&zwnj;ها نمی&zwnj;رسید.</span></p><p>آگاممنون<br></p><p>نیازآوران<br></p><p>الاهگان انتقام<br></p><p><b>۲: پرومتئوس در بند</b><br></p><p>پرومتئوس در بند با ساختار ساده&zwnj;ای که دارد و با زبانی استوار و پرشکوه و با تخیلی به&zwnj;راستی شگفت&zwnj;انگیز، در طول سالیان و اعصار یکی از مهم&zwnj;ترین آثار آیسخولوس شمرده شده است.</p><p><b>۳: هفت دشمن تبس</b><br></p><p>در نمایشنامه وزغ&zwnj;ها اثر آریستوفانس، وقتی ائوریپیدس آیسخولوس را به چالش می&zwnj;خواند و از او می&zwnj;خواهد ثابت کند که شاعری برتر از اوست، آیسخولوس در جواب حریف پیش از هر اثر دیگر از هفت دشمن تبس نام می&zwnj;برد. در آن نمایشنامه حرف آیسخولوس این است که ائوریپیدس با آفرینش زنانی هوسباره و کژگویی&zwnj;های سفسطه&zwnj;آمیز سطح اخلاقیات جامعه آتن را تنزل داده و به&zwnj;طورکلی مردم را «ضعیف&zwnj;تر و بدتر» کرده است.<br></p><p><b>۴: پارسیان</b><br></p><p>نمایشنامه پارسیان در سال ۴۷۲ ق م در آتن اجرا شد، یعنی هشت سال بعد از نبرد سالامیس که این نمایشنامه در بزرگداشت آن است. بنا بر برخی داده&zwnj;ها این نمایشنامه بر اساس نمایشنامه&zwnj;ای (مفقود) از فرونیخوس با عنوان فنیقی&zwnj;ها نوشته شد. با این تفاوت که فرونیخوس در همان اول نمایشنامه شکست خشیارشا را خبر می&zwnj;دهد اما در نمایشنامه آیسخولوس ما همسرایانی مرکب از سالخوردگان پارسی و نیز مادر خشیارشا را داریم که در آغاز از امید و بیم خود سخن می&zwnj;گویند و آنگاه خبر شکست پارسیان را می&zwnj;شنوند. این وقفه سبب می&zwnj;شود که شکست پارسیان جلوه&zwnj;ای نمایان&zwnj;تر بیابد. سپس، مادر خشیارشا، روح شوی خود داریوش&zwnj;شاه را فرا می&zwnj;خواند و داریوش درعین دلداری ایشان، از شکستی دیگر در پالاتئا (یک سال بعد از نبرد سالامیس) خبر می&zwnj;دهد.</p><p>آنگاه نوبت به خشیارشا می&zwnj;رسد که خسته و درهم شکسته با پیرهنی ژنده به صحنه بیاید.</p><p>پارسیان تنها تراژدی برجامانده یونانی است که بر اساس ماجرایی تاریخی نوشته شده است.&nbsp;</p><p><b>۵: پناه&zwnj;جویان</b><br></p><p>پژوهشگران معاصر اغلب بر این باور بودند که پناه&zwnj;جویان نخستین نمایشنامه یونانی برجا مانده است و تاریخ اجرای آن را در حدود ۴۹۰ ق م می&zwnj;دانستند. این باور هم مبتنی بر ویژگی&zwnj;های سبک و قالب این اثر بود و هم بر اساس این نکته که شخصیت اصلی در آن گروه همسرایان است و ارسطو به ما آموخته که تراژدی&zwnj;های اولیه چنین بوده است. یعنی همه&zwnj;چیز بر عهده همسرایان بوده که دقیقا پنجاه نفر بوده&zwnj;اند. اما متن پاپیروسی که به تازگی کشف شد نشان می&zwnj;دهد که پناه&zwnj;جویان بخشی از یک تریلوژی بوده که در سال ۴۷۰ ق م به صحنه رفته است.&nbsp;</p><h2>خواندن کتاب آیسخولوس را به چه کسانی پیشنهاد می&zwnj;کنیم</h2><p>این اثر سترگ را به دوستداران و پژوهشگران نمایشنامه&zwnj;های یونان باستان پیشنهاد می&zwnj;کنیم.</p><h2>بخشی از کتاب آیسخولوس </h2><p>«آگاممنون: بانوی من، دختر لدا، پاسدار خانه و خاندان من.</p><p>خوش&zwnj;آمدت را سپاس می&zwnj;گویم که چندان به درازا کشید</p><p>که در خور غیبت طولانی من باشد.</p><p>اگرچه خوش می&zwnj;داشتم که این خوش&zwnj;آمد از دهانی دیگر بشنوم.</p><p>و دیگر این&zwnj;که خوش نمی&zwnj;دارم رسم و راه زنان خوی مردی از من بزداید.</p><p>و نیز خوش نمی&zwnj;دارم این بانگ و غوغا را</p><p>که به خوشامد من برخاسته است</p><p>و این فرش ارغوانی که ستایش ایزدان را درخور است</p><p>و مرا دلِ پای نهادن بر آن نیست.</p><p>مرا چون آفریده&zwnj;ای میرا خوش&zwnj;آمد گویید، نه چون یکی از ایزدان.</p><p>برترین بخشش آسمان را خِرد بدانید</p><p>و برترین مرد آن کس را بشناسید</p><p>که زندگی درازش پایانی خوش می&zwnj;یابد.</p><p>من چنان خواهم کرد که گفتم</p><p>و از هیچ گزندی هراسم نخواهد بود.</p><p>کلوتمنسترا: چنین مگوی و خواست من به جای آر که دوستدار توام.</p><p>آگاممنون: نه، از سخن خود بازنمی&zwnj;گردم که آنچه گفتم دانسته گفتم.</p><p>کلوتمنسترا: آیا ترسی به دل داری</p><p>که این&zwnj;چنین در پیشگاه خدایان سر فرو می&zwnj;داری؟</p><p>آگاممنون: به آنچه می&zwnj;کنم آگاهم و از رای خود برنمی&zwnj;گردم.</p><p>کلوتمنسترا: راستی را که پریام چه می&zwnj;کرد اگر فاتح این جنگ می&zwnj;بود؟</p><p>آگاممنون: آه، بی&zwnj;گمان بر فرش ارغوانی پای می&zwnj;نهاد.</p><p>کلوتمنسترا: پس سزاوار نیست که از زبان&zwnj;های جنبان بهراسی.</p><p>آگاممنون: نکوهش ِ مردمان را نیرویی هولناک است.</p><p>کلوتمنسترا: آن&zwnj;که از رشک مردمان می&zwnj;هراسد، از سرفرازی بیمناک است.</p><p>آگاممنون: خوی جدل شایسته زنان نیست.</p><p>کلوتمنسترا: اما شایسته فاتحان هست که گاه از پیروزی چشم بپوشند.</p><p>آگاممنون: آیا پیروزی تو به جدالی چنین می&zwnj;ارزد؟</p><p>کلوتمنسترا: بیش از این پای مفشار و کار به من واگذار.»</p></div>
      `,
      price: 72000,
      publisherId: 6,
      status: 1,
      image: imageUUID5,
    },
    {
      name: "توتوچان",
      publishedYear: 1340,
      content: `
<h2 class="bookDescription_bookDescriptionHeader__2BZou">معرفی کتاب توتوچان</h2><div class="bookDescription_bookDescriptionContent__BKsT2"><p>کتاب&nbsp;<b>توتوچان؛&nbsp;<span>دخترکی آن سوی پنجره</span><span>&nbsp;</span></b><span>نوشتهٔ&nbsp;</span><b>تتسوکو کورویاناگی</b><span> و ترجمهٔ&nbsp;</span><b>سیمین محسنی</b><span> است و&nbsp;</span><span>نشر <b>نی </b>آن را منتشر کرده است.&nbsp;</span><span>شیوهٔ آموزش و پرورش آزاد در ژاپن در این داستان روایت می&zwnj;شود.</span></p><h2><span>درباره&nbsp;</span><span>کتاب توتوچان</span></h2><p>در مدرسه&zwnj;ٔ توموئه که دانش&zwnj;آموزان آن مجاز بودند روی هر موضوعی که به آن علاقه&zwnj;مندند کار کنند، باید بدون توجه به آنچه در اطرافشان جریان داشت، ذهن خود را روی موضوع موردعلاقه&zwnj;شان متمرکز کنند. به این ترتیب، هیچ&zwnj;کس به بچه&zwnj;ای که آواز «چشم، چشم، دو ابرو» را می&zwnj;خواند، توجهی نمی&zwnj;کرد. یکی دو نفر به این موضوع علاقه&zwnj;مند شده بودند؛ اما بقیه غرق در کتاب&zwnj;های خودشان بودند. کتاب <b>توتوچان </b>قصه&zwnj;ای افسانه&zwnj;ای بود؛ درباره&zwnj;ٔ ماجراهای مرد ثروتمندی که می&zwnj;خواست دخترش ازدواج کند. نقاشی&zwnj;های آن جالب بود و کتاب طرفدار زیادی داشت.</p><p>همه&zwnj;ٔ دانش&zwnj;آموزان مدرسه که مثل ماهی ساردین داخل واگن چپیده بودند، آنچه را در کتاب&zwnj;ها نوشته شده بود، با ولع می&zwnj;خواندند. آفتاب صبحگاهی از ورای پنجره&zwnj;ها به درون می&zwnj;تابید و چشم&zwnj;اندازی پدید می&zwnj;آورد که سبب شادمانی قلبی مدیر مدرسه می&zwnj;شد. همه&zwnj;ٔ دانش&zwnj;آموزان آن روز را در کتابخانه گذراندند.</p><p><b> تتسوکو کورویاناگی </b>در این کتاب کوشیده&zwnj; شیوه&zwnj;های آموزشی آقای کوبایاشی را توصیف کند. او اعتقاد داشت همه کودکان ذاتاً با طبیعت و سرشت خوبی به&zwnj;دنیا می&zwnj;آیند؛ ولی محیط و تأثیر رفتار غلط بزرگسالان به آنان آسیب می&zwnj;رساند. هدف او آن بود که «طبیعت خوب» کودکان را آشکار ساخته و آن را بهبود و تکامل بخشد؛ تا به این ترتیب کودکان مردمانی باشخصیت بار بیایند.</p><p>آقای کوبایاشی «طبیعی&zwnj;بودن» را ارزشمند می&zwnj;دانست و می&zwnj;خواست کاری کند که شخصیت کودکان تا حدّ ممکن طبیعی رشد و تحول یابد. او طبیعت را نیز دوست داشت. میوچان، دختر کوچک او، یک روز به نویسنده گفت پدرش عادت داشت هنگام کودکی، او را برای گردش و قدم&zwnj;زدن ببرد و می&zwnj;گفته است: «بیا در طبیعت دنبال هماهنگی بگردیم.»</p><h2>خواندن کتاب توتوچان را به چه کسانی پیشنهاد می&zwnj;کنیم</h2><p>این کتاب را به دوستداران داستان&zwnj;های ژاپنی و همچنین علاقه&zwnj;مندان به آموزش و پرورش ژاپن پیشنهاد می&zwnj;کنیم.</p><h2>بخشی از کتاب توتوچان</h2><p>«در ایستگاه جیوگائوکا از قطار اویماچی پیاده شدند. مادر دست توتو چان را گرفت تا او را به سمتی که بلیت&zwnj;ها را کنترل می&zwnj;کردند، ببرد. او تا به&zwnj;حال به&zwnj;ندرت سوار قطار شده بود و دوست نداشت بلیتی را که با اشتیاق در چنگ می&zwnj;فشرد، از دست بدهد.</p><p>توتو چان، از کنترل&zwnj;کننده بلیت پرسید: «اجازه می&zwnj;دهید این را برای خودم نگه دارم؟»</p><p>مرد، درحالی&zwnj;که بلیت را می&zwnj;گرفت، پاسخ داد: «نه، نمی&zwnj;توانید!»</p><p>توتو چان، به جعبه پر از بلیت مأمور اشاره کرد و گفت: «همه این&zwnj;ها مال شماست؟»</p><p>مأمور کنترل، درحالی&zwnj;که بلیت&zwnj;ها را از دست مسافران جمع می&zwnj;کرد، پاسخ داد: «نه، این بلیت&zwnj;ها مال اداره راه&zwnj;آهن است.»</p><p>توتو چان، با اشتیاق به جعبه خیره شد و گفت: «وقتی بزرگ شدم، فروشنده بلیت راه&zwnj;آهن خواهم شد.»</p><p>مأمور کنترل، برای اولین&zwnj;بار نگاهی به او انداخت و گفت: «پسر کوچک من هم می&zwnj;خواهد در ایستگاه کار کند. بنابراین، با یکدیگر همکار خواهید شد.»</p><p>توتو چان، قدمی به عقب برداشت و نگاه دقیقی به مأمور جمع&zwnj;کننده بلیت انداخت. او آدمی چاق و عینکی بود که نسبتاً مهربان به&zwnj;نظر می&zwnj;رسید. دست&zwnj;هایش را به پشت برد تا درباره این پیشنهاد به&zwnj;دقت فکر کند. سپس به مأمور گفت: «هوم! اصلا در این فکر نبودم که با پسر شما همکار شوم؛ اما بعداً در این باره فکر می&zwnj;کنم. فعلا گرفتارم، چون دارم به مدرسه جدید می&zwnj;روم.»</p><p>توتو چان، به سوی محلی که مادرش منتظر بود دوید و فریاد زد: «می&zwnj;خواهم بلیت&zwnj;فروش بشوم!»</p><p>مادر شگفت&zwnj;زده نشد، اما گفت: «فکر می&zwnj;کردم می&zwnj;خواهی جاسوس بشوی!»</p><p>توتو چان درحالی&zwnj;که دست در دست مادر در کنارش راه می&zwnj;رفت، به&zwnj;خاطر آورد تا روز پیش کاملا مطمئن بوده است که می&zwnj;خواهد جاسوس بشود. ولی این&zwnj;که آدم مسئول جعبه&zwnj;ای پر از بلیت باشد نیز کار لذت&zwnj;بخشی بود!</p><p>ناگهان، فکر درخشانی به سرش زد: «درستش همین است.» به مادرش نگاه کرد و با صدای بلند او را از فکرش آگاه ساخت و گفت: «نمی&zwnj;توانم بلیت&zwnj;فروشی باشم که درواقع جاسوس است؟»</p><p>مادر پاسخی نداد. سیمای دوست&zwnj;داشتنی&zwnj;اش، زیر کلاه نمدی&zwnj;اش که گل&zwnj;های کوچک بر آن نقش بسته بود، جدی می&zwnj;نمود. حقیقت این بود که مادر در نگرانی عمیقی به&zwnj;سر می&zwnj;برد. اگر توتو چان را در مدرسه جدید نمی&zwnj;پذیرفتند، چه می&zwnj;شد؟ به توتو چان نگریست که در کنار جاده، جست&zwnj;وخیز می&zwnj;کرد و تندتند با خودش حرف می&zwnj;زد. توتو چان نمی&zwnj;دانست مادرش چقدر نگران اوست؛ بنابراین، هنگامی که نگاهشان با هم گره خورد، با خوشحالی گفت: «عقیده&zwnj;ام را عوض کردم. فکر کنم بهتر است همراه و همکار گروه نوازندگان خیابانی شوم که برای تبلیغ فروشگاه&zwnj;های جدید آهنگ می&zwnj;زنند!»</p><p>در صدای مادر یأس و نومیدی احساس می&zwnj;شد، گفت: «بدو بیا، دیر می&zwnj;شود. نباید آقای مدیر را منتظر بگذاریم. دیگر وراجی نکن. مواظب باش کجا می&zwnj;روی و درست راه بیا.»</p><p>کمی آن سوتر، دروازه مدرسه&zwnj;ای کوچک، کم&zwnj;کم، در مقابل آنان پدیدار شد.»</p></div>
      `,
      price: 68000,
      publisherId: 6,
      status: 1,
      image: imageUUID6,
    },
    {
      name: "چک لیست",
      publishedYear: 1330,
      content: `
<h2 class="bookDescription_bookDescriptionHeader__2BZou">معرفی کتاب توتوچان</h2><div class="bookDescription_bookDescriptionContent__BKsT2"><p>کتاب&nbsp;<b>توتوچان؛&nbsp;<span>دخترکی آن سوی پنجره</span><span>&nbsp;</span></b><span>نوشتهٔ&nbsp;</span><b>تتسوکو کورویاناگی</b><span> و ترجمهٔ&nbsp;</span><b>سیمین محسنی</b><span> است و&nbsp;</span><span>نشر <b>نی </b>آن را منتشر کرده است.&nbsp;</span><span>شیوهٔ آموزش و پرورش آزاد در ژاپن در این داستان روایت می&zwnj;شود.</span></p><h2><span>درباره&nbsp;</span><span>کتاب توتوچان</span></h2><p>در مدرسه&zwnj;ٔ توموئه که دانش&zwnj;آموزان آن مجاز بودند روی هر موضوعی که به آن علاقه&zwnj;مندند کار کنند، باید بدون توجه به آنچه در اطرافشان جریان داشت، ذهن خود را روی موضوع موردعلاقه&zwnj;شان متمرکز کنند. به این ترتیب، هیچ&zwnj;کس به بچه&zwnj;ای که آواز «چشم، چشم، دو ابرو» را می&zwnj;خواند، توجهی نمی&zwnj;کرد. یکی دو نفر به این موضوع علاقه&zwnj;مند شده بودند؛ اما بقیه غرق در کتاب&zwnj;های خودشان بودند. کتاب <b>توتوچان </b>قصه&zwnj;ای افسانه&zwnj;ای بود؛ درباره&zwnj;ٔ ماجراهای مرد ثروتمندی که می&zwnj;خواست دخترش ازدواج کند. نقاشی&zwnj;های آن جالب بود و کتاب طرفدار زیادی داشت.</p><p>همه&zwnj;ٔ دانش&zwnj;آموزان مدرسه که مثل ماهی ساردین داخل واگن چپیده بودند، آنچه را در کتاب&zwnj;ها نوشته شده بود، با ولع می&zwnj;خواندند. آفتاب صبحگاهی از ورای پنجره&zwnj;ها به درون می&zwnj;تابید و چشم&zwnj;اندازی پدید می&zwnj;آورد که سبب شادمانی قلبی مدیر مدرسه می&zwnj;شد. همه&zwnj;ٔ دانش&zwnj;آموزان آن روز را در کتابخانه گذراندند.</p><p><b> تتسوکو کورویاناگی </b>در این کتاب کوشیده&zwnj; شیوه&zwnj;های آموزشی آقای کوبایاشی را توصیف کند. او اعتقاد داشت همه کودکان ذاتاً با طبیعت و سرشت خوبی به&zwnj;دنیا می&zwnj;آیند؛ ولی محیط و تأثیر رفتار غلط بزرگسالان به آنان آسیب می&zwnj;رساند. هدف او آن بود که «طبیعت خوب» کودکان را آشکار ساخته و آن را بهبود و تکامل بخشد؛ تا به این ترتیب کودکان مردمانی باشخصیت بار بیایند.</p><p>آقای کوبایاشی «طبیعی&zwnj;بودن» را ارزشمند می&zwnj;دانست و می&zwnj;خواست کاری کند که شخصیت کودکان تا حدّ ممکن طبیعی رشد و تحول یابد. او طبیعت را نیز دوست داشت. میوچان، دختر کوچک او، یک روز به نویسنده گفت پدرش عادت داشت هنگام کودکی، او را برای گردش و قدم&zwnj;زدن ببرد و می&zwnj;گفته است: «بیا در طبیعت دنبال هماهنگی بگردیم.»</p><h2>خواندن کتاب توتوچان را به چه کسانی پیشنهاد می&zwnj;کنیم</h2><p>این کتاب را به دوستداران داستان&zwnj;های ژاپنی و همچنین علاقه&zwnj;مندان به آموزش و پرورش ژاپن پیشنهاد می&zwnj;کنیم.</p><h2>بخشی از کتاب توتوچان</h2><p>«در ایستگاه جیوگائوکا از قطار اویماچی پیاده شدند. مادر دست توتو چان را گرفت تا او را به سمتی که بلیت&zwnj;ها را کنترل می&zwnj;کردند، ببرد. او تا به&zwnj;حال به&zwnj;ندرت سوار قطار شده بود و دوست نداشت بلیتی را که با اشتیاق در چنگ می&zwnj;فشرد، از دست بدهد.</p><p>توتو چان، از کنترل&zwnj;کننده بلیت پرسید: «اجازه می&zwnj;دهید این را برای خودم نگه دارم؟»</p><p>مرد، درحالی&zwnj;که بلیت را می&zwnj;گرفت، پاسخ داد: «نه، نمی&zwnj;توانید!»</p><p>توتو چان، به جعبه پر از بلیت مأمور اشاره کرد و گفت: «همه این&zwnj;ها مال شماست؟»</p><p>مأمور کنترل، درحالی&zwnj;که بلیت&zwnj;ها را از دست مسافران جمع می&zwnj;کرد، پاسخ داد: «نه، این بلیت&zwnj;ها مال اداره راه&zwnj;آهن است.»</p><p>توتو چان، با اشتیاق به جعبه خیره شد و گفت: «وقتی بزرگ شدم، فروشنده بلیت راه&zwnj;آهن خواهم شد.»</p><p>مأمور کنترل، برای اولین&zwnj;بار نگاهی به او انداخت و گفت: «پسر کوچک من هم می&zwnj;خواهد در ایستگاه کار کند. بنابراین، با یکدیگر همکار خواهید شد.»</p><p>توتو چان، قدمی به عقب برداشت و نگاه دقیقی به مأمور جمع&zwnj;کننده بلیت انداخت. او آدمی چاق و عینکی بود که نسبتاً مهربان به&zwnj;نظر می&zwnj;رسید. دست&zwnj;هایش را به پشت برد تا درباره این پیشنهاد به&zwnj;دقت فکر کند. سپس به مأمور گفت: «هوم! اصلا در این فکر نبودم که با پسر شما همکار شوم؛ اما بعداً در این باره فکر می&zwnj;کنم. فعلا گرفتارم، چون دارم به مدرسه جدید می&zwnj;روم.»</p><p>توتو چان، به سوی محلی که مادرش منتظر بود دوید و فریاد زد: «می&zwnj;خواهم بلیت&zwnj;فروش بشوم!»</p><p>مادر شگفت&zwnj;زده نشد، اما گفت: «فکر می&zwnj;کردم می&zwnj;خواهی جاسوس بشوی!»</p><p>توتو چان درحالی&zwnj;که دست در دست مادر در کنارش راه می&zwnj;رفت، به&zwnj;خاطر آورد تا روز پیش کاملا مطمئن بوده است که می&zwnj;خواهد جاسوس بشود. ولی این&zwnj;که آدم مسئول جعبه&zwnj;ای پر از بلیت باشد نیز کار لذت&zwnj;بخشی بود!</p><p>ناگهان، فکر درخشانی به سرش زد: «درستش همین است.» به مادرش نگاه کرد و با صدای بلند او را از فکرش آگاه ساخت و گفت: «نمی&zwnj;توانم بلیت&zwnj;فروشی باشم که درواقع جاسوس است؟»</p><p>مادر پاسخی نداد. سیمای دوست&zwnj;داشتنی&zwnj;اش، زیر کلاه نمدی&zwnj;اش که گل&zwnj;های کوچک بر آن نقش بسته بود، جدی می&zwnj;نمود. حقیقت این بود که مادر در نگرانی عمیقی به&zwnj;سر می&zwnj;برد. اگر توتو چان را در مدرسه جدید نمی&zwnj;پذیرفتند، چه می&zwnj;شد؟ به توتو چان نگریست که در کنار جاده، جست&zwnj;وخیز می&zwnj;کرد و تندتند با خودش حرف می&zwnj;زد. توتو چان نمی&zwnj;دانست مادرش چقدر نگران اوست؛ بنابراین، هنگامی که نگاهشان با هم گره خورد، با خوشحالی گفت: «عقیده&zwnj;ام را عوض کردم. فکر کنم بهتر است همراه و همکار گروه نوازندگان خیابانی شوم که برای تبلیغ فروشگاه&zwnj;های جدید آهنگ می&zwnj;زنند!»</p><p>در صدای مادر یأس و نومیدی احساس می&zwnj;شد، گفت: «بدو بیا، دیر می&zwnj;شود. نباید آقای مدیر را منتظر بگذاریم. دیگر وراجی نکن. مواظب باش کجا می&zwnj;روی و درست راه بیا.»</p><p>کمی آن سوتر، دروازه مدرسه&zwnj;ای کوچک، کم&zwnj;کم، در مقابل آنان پدیدار شد.»</p></div>
      `,
      price: 68000,
      publisherId: 6,
      status: 1,
      image: imageUUID3,
    },
  ]);
  console.log("Books seed has been finished");

  //Tags
  await Tag.bulkCreate([
    { name: "فروش ویژه", status: 1 },
    { name: "تاریخی ", status: 0 },
    { name: "ترجمه ", status: 1 },
    { name: "داستان کوتاه ", status: 0 },
  ]);

  console.log("tag seed has been finished");

  //bookTag
  await Book_tag.bulkCreate([
    { book_id: 1, tag_id: 3 },
    { book_id: 1, tag_id: 2 },
    { book_id: 2, tag_id: 1 },
    { book_id: 1, tag_id: 1 },
    { book_id: 4, tag_id: 1 },
    { book_id: 4, tag_id: 2 },
  ]);
  console.log("book tag seed has been finished");

  //category

  await Category.bulkCreate([
    {
      name: "کلاسیک",
      image: imageUUID7,
      icon: imageUUID13,
      main: true,
      status: 1,
    },
    {
      name: "ترسناک",
      image: imageUUID8,
      icon: imageUUID13,
      main: true,
      status: 0,
    },
    {
      name: "تاریخی",
      image: imageUUID9,
      icon: imageUUID13,
      main: true,
      status: 1,
    },
    {
      name: "کمدی",
      image: imageUUID10,
      icon: imageUUID13,
      main: true,
      status: 0,
    },
    {
      name: "ادبیات",
      image: imageUUID11,
      icon: imageUUID13,
      main: true,
      status: 1,
    },
    {
      name: "اسلام",
      image: imageUUID12,
      icon: imageUUID13,
      main: true,
      status: 0,
    },
    {
      name: "ایران",
      parentId: 3,
      image: imageUUID8,
      icon: imageUUID13,
      status: 0,
    },
    {
      name: "علمی",
      parentId: 3,
      image: imageUUID10,
      icon: imageUUID13,
      status: 1,
    },
    {
      name: "دیالوگ",
      parentId: 4,
      image: imageUUID7,
      icon: imageUUID13,
      status: 1,
    },
    {
      name: "مونولوگ",
      parentId: 4,
      image: imageUUID10,
      icon: imageUUID13,
      status: 1,
    },
    {
      name: "هزل",
      parentId: 4,
      image: imageUUID8,
      icon: imageUUID13,
      status: 0,
    },
    {
      name: "نمایشنامه",
      parentId: 5,
      image: imageUUID12,
      icon: imageUUID13,
      status: 0,
    },
    {
      name: "رمان",
      parentId: 5,
      image: imageUUID11,
      icon: imageUUID13,
      status: 1,
    },
    {
      name: "داستان خارجی",
      parentId: 5,
      image: imageUUID8,
      icon: imageUUID13,
    },
  ]);
  console.log("category seed has been finished");

  //bookCategory
  const bookCategories = await Book_category.bulkCreate([
    { book_id: 1, category_id: 8 },
    { book_id: 3, category_id: 4 },
    { book_id: 4, category_id: 7 },
    { book_id: 5, category_id: 12 },
    { book_id: 6, category_id: 13 },
    { book_id: 6, category_id: 14 },
    { book_id: 7, category_id: 8 },
  ]);

  //Authors

  await Author.bulkCreate([
    {
      firstName: "فرزین",
      lastName: "احمدی",
      coutnry: "ایران",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 28)
      ).toISOString(),
      content: "فرزین احمدی جوان 28 ساله و با استعداد ایرانی",
      status: 1,
    },
    {
      firstName: "رابین",
      lastName: "شارما",
      coutnry: "کانادا",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "رابین شارما در سال ۱۹۶۵ در کانادا متولد شد.",
      status: 1,
    },
    {
      firstName: "یرواند",
      lastName: "آبراهامیان",
      coutnry: "",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "",
      status: 0,
    },
    {
      firstName: "محمدابراهیم",
      lastName: "فتاحی",
      coutnry: "",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "",
      status: 1,
    },
    {
      firstName: "عبدالله ",
      lastName: "کوثری",
      coutnry: "",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "",
      status: 1,
    },
    {
      firstName: "تتسوکو",
      lastName: "کورویاناگی",
      coutnry: "",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "",
      status: 0,
    },
    {
      firstName: "سیمین",
      lastName: "محسنی",
      coutnry: "",
      birthDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 120)
      ).toISOString(),
      deathDate: new Date(
        new Date().setFullYear(new Date().getFullYear() - 67)
      ).toISOString(),
      content: "",
    },
  ]);
  console.log("Authors seed has been finished");

  //Book Authors
  await BookAuthor.bulkCreate([
    {
      authorType: 1,
      author_id: 2,
      book_id: 2,
    },
    {
      authorType: 1,
      author_id: 1,
      book_id: 1,
    },
    {
      authorType: 2,
      author_id: 1,
      book_id: 2,
    },
    {
      authorType: 1,
      author_id: 3,
      book_id: 4,
    },
    {
      authorType: 3,
      author_id: 4,
      book_id: 4,
    },
    {
      authorType: 1,
      author_id: 6,
      book_id: 5,
    },
    {
      authorType: 1,
      author_id: 6,
      book_id: 6,
    },
    {
      authorType: 3,
      author_id: 7,
      book_id: 6,
    },
    {
      authorType: 1,
      author_id: 7,
      book_id: 3,
    },
    {
      authorType: 3,
      author_id: 7,
      book_id: 7,
    },
  ]);
  console.log("Book Authors seed has been finished");

  //Off Price
  await Off_price.bulkCreate([
    {
      type: 1,
      amount: 5,
      book_id: 1,
      startDate: "2023-01-10T12:49:14.892Z",
      endDate: "2023-01-16T12:49:14.892Z",
    },
    {
      type: 2,
      amount: 3000,
      book_id: 2,
      startDate: "2023-01-15T12:49:14.892Z",
      endDate: "2023-01-19T12:49:14.892Z",
    },
  ]);
  console.log("Off price seed has been finished");

  const sizeArr = ["Kb", "Mb"];
  //Book image
  await File.bulkCreate([
    { uuid: imageUUID1, name: "1.jpg", path: "wy.03x3w01c.jpg" },
    { uuid: imageUUID2, name: "2.jpg", path: "13l.ewmzcpshf.jpg" },
    { uuid: imageUUID3, name: "3.jpg", path: "7k.1kyzbxzy.jpg" },
    { uuid: imageUUID4, name: "4.jpg", path: "1dv.xg7x3ijv.jpg" },
    { uuid: imageUUID5, name: "5.jpg", path: "us.r4ooi24k.jpg" },
    { uuid: imageUUID6, name: "6.jpg", path: "1yj.abyz0v2x.jpg" },
    { uuid: imageUUID7, name: "7.jpg", path: "2yj.abyz0v2x.jpg" },
    { uuid: imageUUID8, name: "8.jpg", path: "3yj.abyz0v2x.jpg" },
    { uuid: imageUUID9, name: "9.jpg", path: "38j.abyz0v2x.jpg" },
    { uuid: imageUUID10, name: "10.jpg", path: "9yj.abyz0v2x.jpg" },
    { uuid: imageUUID11, name: "11.jpg", path: "3yj.aeyz0v2x.jpg" },
    { uuid: imageUUID12, name: "12.jpg", path: "3yj.abrz0v2x.jpg" },
    { uuid: imageUUID13, name: "icon.svg", path: "3yj.abrz0e8x.svg" },
    {
      name: "aa.pdf",
      path: "1cg.517itrhf.pdf",
      book_id: 1,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
    {
      name: "bb.pdf",
      path: "1n4.dstn1gc9.pdf",
      book_id: 2,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
    {
      name: "cc.pdf",
      path: "1bf.1hn5rnuj.pdf",
      book_id: 3,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
    {
      name: "dd.pdf",
      path: "u5.kgqvk4c1l.pdf",
      book_id: 4,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
    {
      name: "ee.pdf",
      path: "1wl.o4g9dcl4.pdf",
      book_id: 5,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
    {
      name: "ff.pdf",
      path: "1w2.bc97ivpz.pdf",
      book_id: 6,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
    {
      name: "hh.pdf",
      path: "1wl.o4g9dcl4.pdf",
      book_id: 6,
      metaData: JSON.stringify({
        pageCount: {
          label: "تعداد صفحات",
          value: Math.floor(Math.random() * 20) + 1,
        },
        size: {
          label: "حجم فایل",
          value: `${Math.floor(Math.random() * 20) + 1}${
            sizeArr[Math.floor(Math.random() * 2)]
          }`,
        },
      }),
    },
  ]);
  console.log("Book images setup");

  process.exit();
})();
