USE RISKLICKDB;
INSERT INTO post (title, slug, createdAt, postText, authorId)
VALUES (
        'First post',
        'first-post',
        'September 6th 2023, 12:18:13 am',
        'Ad eu qui excepteur commodo commodo nisi cillum nulla culpa adipisicing sit culpa consequat. Eiusmod pariatur id esse enim aliquip enim anim ut. Ad duis ex ea ipsum laborum. Nostrud velit aliqua velit dolore. Cupidatat ipsum est do do nulla reprehenderit consequat dolore consectetur esse ipsum. Eiusmod duis labore eiusmod eiusmod ex consequat veniam laboris incididunt incididunt incididunt reprehenderit excepteur.',
        '1'
       );
       INSERT INTO post (title, slug, createdAt, postText, authorId)
VALUES (
        'Second post',
        'Second-post',
        'September 6th 2023, 12:18:13 am',
        'Ad eu qui excepteur commodo commodo nisi cillum nulla culpa adipisicing sit culpa consequat. Eiusmod pariatur id esse enim aliquip enim anim ut. Ad duis ex ea ipsum laborum. Nostrud velit aliqua velit dolore. Cupidatat ipsum est do do nulla reprehenderit consequat dolore consectetur esse ipsum. Eiusmod duis labore eiusmod eiusmod ex consequat veniam laboris incididunt incididunt incididunt reprehenderit excepteur.',
        '2'
       );
       INSERT INTO post (title, slug, createdAt, postText, authorId)
VALUES (
        'third post',
        'third-post',
        'September 6th 2023, 12:18:13 am',
        'Ad eu qui excepteur commodo commodo nisi cillum nulla culpa adipisicing sit culpa consequat. Eiusmod pariatur id esse enim aliquip enim anim ut. Ad duis ex ea ipsum laborum. Nostrud velit aliqua velit dolore. Cupidatat ipsum est do do nulla reprehenderit consequat dolore consectetur esse ipsum. Eiusmod duis labore eiusmod eiusmod ex consequat veniam laboris incididunt incididunt incididunt reprehenderit excepteur.',
        '3'
       );
INSERT INTO comment (commentText, createdAt, authorId, postId)
VALUES (
         'This is the first comment',
        'September 6th 2023, 12:18:13 am',
        '1',
        '1'
        );
INSERT INTO comment (commentText, createdAt, authorId, postId)
VALUES (
         'This is the second comment written by another user',
        'September 7th 2023, 12:18:13 am',
        '2',
        '1'
)