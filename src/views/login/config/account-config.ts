export const acconutRules = {
  name: [
    { required: true, message: "请输入账户", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{2,10}$/,
      message: "允许输入2-10个字符",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{2,10}$/,
      message: "允许输入2-10个字符",
      trigger: "blur"
    }
  ]
};
