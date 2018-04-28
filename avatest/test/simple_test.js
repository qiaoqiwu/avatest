import test from 'ava';

function trimAll(string) {
    return string.replace(/[\s\b]/g, '');
}

test('trimAll testing', t => {
    t.is(trimAll(' \n \r \t \v \b \f B a r r  i  o  r  \n  \r  \t  \v  \b  \f  '), 'Barrior');

    t.is(trimAll('Barrior'), 'Barrior');

    t.is(trimAll(new String(' T o m ')), 'Tom');

    [undefined, null, 0, true, [], {}, () => {}, Symbol()].forEach(type => {
        t.throws(() => {
            trimAll(type);
        });
    });
});
