USE RISKLICKDB;
CREATE TABLE post(
    postID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL,
    createdAt VARCHAR(50),
    updatedAt VARCHAR(50),
    postText MEDIUMTEXT,
    authorId INT NOT NULL,
    FOREIGN KEY (authorId) REFERENCES users(ID)
);
CREATE TABLE comment(
    commentID INT AUTO_INCREMENT PRIMARY KEY,
    commentText MEDIUMTEXT,
    createdAt VARCHAR(50),
    authorId INT NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (authorId) REFERENCES users(ID),
    FOREIGN KEY (postId) REFERENCES post(postID)
)

