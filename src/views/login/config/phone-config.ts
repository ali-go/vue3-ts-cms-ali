// 规则
export const phoneRules = {
  num: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1(3|4|5|7|8|9)\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur"
    }
  ],
  vertify: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      pattern: /^\d{6}$/,
      message: "请输入正确的验证码",
      trigger: "blur"
    }
  ]
};
