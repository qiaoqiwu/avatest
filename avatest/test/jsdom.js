import test from 'ava';
import {JSDOM} from 'jsdom';

const html = `
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div class="comment-box">
        <textarea></textarea>
        <div class="btn">发布</div>
        <ul class="list"></ul>
    </div>
    <script>
        const textarea = document.querySelector('.comment-box textarea');
        const btn = document.querySelector('.btn');
        const list = document.querySelector('.list');

        btn.addEventListener('click', () => {
            const content = textarea.value;
            if (content) {
                const li = document.createElement('li');
                li.innerHTML = content;
                list.insertBefore(li, list.children[0]);
                textarea.value = '';
            }
        });
    </script>
</body>
</html>
`;

const {window} = new JSDOM(html, {runScripts: 'dangerously'});
const document = window.document;

test('emulate DOM environment with JSDOM', t => {
    const textarea = document.querySelector('.comment-box textarea');
    const btn = document.querySelector('.btn');
    const list = document.querySelector('.list');
    const text = 'hello world';

    btn.click();                                 // 触发按钮的点击事件，此时文本框中没有输入内容
    t.is(list.children.length, 0);               // 列表应该保持为空

    textarea.value = text;                       // 文本框中输入内容
    btn.click();                                 // 触发按钮的点击事件
    t.is(list.children.length, 1);               // 此时列表的长度应该为 1
    t.is(list.children[0].innerHTML, text);      // 此时，第一个评论的内容应该等于刚刚我们输入的内容
    t.falsy(textarea.value);                     // 评论完后，文本框应该清空   
});
