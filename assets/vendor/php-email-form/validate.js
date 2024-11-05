(function () {
  "use strict";

  // 选择所有具有 `php-email-form` 类的表单
  let forms = document.querySelectorAll('.php-email-form');

  // 为每个表单添加提交事件监听
  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();  // 阻止表单的默认提交行为

      let thisForm = this;

      // 显示加载动画，隐藏错误和发送成功消息
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // 使用 FormData 收集表单数据
      let formData = new FormData(thisForm);

      // 初始化 EmailJS
      emailjs.init("o6SqUdIqlrNHfCYgk");  // 替换为你的 EmailJS 用户 ID

      // 创建要发送的邮件数据对象
      let emailData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      //发送邮件
      emailjs.send("service_57v9zkt", "template_tgzpuee", emailData)
        .then(function(response) {
          // 成功时隐藏加载动画并显示发送成功消息
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();  // 重置表单
        }, function(error) {
          // 出错时隐藏加载动画并显示错误消息
          thisForm.querySelector('.loading').classList.remove('d-block');
          displayError(thisForm, 'Email sending failed, please try again later');
        });
    });
  });

  // 错误处理函数
  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
