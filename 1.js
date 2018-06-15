function SocialBook(users = [], posts = {}) {
  this.users = users;
  this.posts = posts;

  this.getAllUsers = () => this.users.map(user => user);

  this.getUserByLogin = login => {
    const userByLogin = this.users.find(user => user.login === login);
    return userByLogin === undefined ? "There is no such a user" : userByLogin;
  };

  this.isUserActive = userId => {
      const userStatus = this.users.find(user => user.id === userId);
    if (!userStatus) {
      return "Такого полтьзовалтеля нет";
    }
    return userStatus.isActive ? "active" : "inactive";
  };

    this.getActiveUsers = () => users.filter(user => user.isActive);        

    this.addUser = user => {
        user.id = getId();
        user.isActive = false;
        this.users.push(user);
        console.log('добавлен пользователь', user);
    };

    this.removeUserById = userId => {
        const remove = this.users.filter(user => user.id !== userId);
        console.log(`Удален пользователь с ID `, userId);
        this.users = remove;
        return remove;
    };
    
    this.getUsersCount = () => this.users.length;
     
    this.getUserPosts = userId => this.posts[userId];

    this.addPost = function (userId, post) {
        this.posts[userId].push(post)
        const lastPost = this.posts[userId].length-1;
        return this.posts[userId][lastPost]
    };

    this.removePost = function (userId, postId) {
        const deletePost = this.posts[userId].filter(post => post.id !== postId);
        this.posts[userId] = deletePost;
        return deletePost;
    };
    
    this.getAllLikes = userId => {
        let getSinglePost = this.getUserPosts(userId);
        return getSinglePost.reduce((acc, item) => acc + item.likes, 0);
    };
    
    this.addPostLike = function(userId, postId) {
        let addLike = this.posts[userId].find(post => post.id == postId);
        return addLike.likes+= 1;
    };

    this.getPostsCount = userId => this.posts[userId].length;
    
}

const initialUsers = [
  {
    id: "-s19a6hqce",
    login: "mangozedog@mail.com",
    password: "qwe123zv",
    isActive: true
  },
  {
    id: "-qkpzenjxe",
    login: "polysweet@skynet.ze",
    password: "123zxc78",
    isActive: true
  },
  {
    id: "-e51cpd4di",
    login: "ajax2k@change.ua",
    password: "ert234qw",
    isActive: false
  }
];

const initialPosts = {
  "-s19a6hqce": [
    { id: "-5sgljaskg", text: "post #1", likes: 3 },
    { id: "-199hb6igr", text: "post #2", likes: 5 },
    { id: "-hy0eyw5qo", text: "post #3", likes: 13 }
  ],
  "-qkpzenjxe": [
    { id: "-5tu69g5rf", text: "post #1", likes: 8 },
    { id: "-bje766393", text: "post #2", likes: 15 }
  ],
  "-e51cpd4di": [
    { id: "-9y6nkmlj4", text: "post #1", likes: 18 },
    { id: "-i03pbhy3s", text: "post #2", likes: 45 }
  ]
};

const getId = () =>
  "-" +
  Math.random()
    .toString(36)
    .substr(2, 9);

const newSocialBook = new SocialBook(initialUsers, initialPosts);

//======================================
console.log("Массив всех пользователей", newSocialBook.getAllUsers());
console.log("Запрос пользлваьеля:",newSocialBook.getUserByLogin("ajax2k@change.ua"));
console.log(newSocialBook.isUserActive("-qkpzenjxe"));
console.log(newSocialBook.getActiveUsers());
console.log("Массив всех пользователей", newSocialBook.getAllUsers());
const newUser = { login: 'Batko', password:'Zeus'};
newSocialBook.addUser(newUser);
newSocialBook.removeUserById("-qkpzenjxe");
console.log("Количество пользователей:", newSocialBook.getUsersCount());
console.log(newSocialBook.getUserPosts("-qkpzenjxe"));
const newPost = { id: getId(), text: "Add something new", likes: 1 };
console.log('Пост добавлен', newSocialBook.addPost("-s19a6hqce", newPost));
console.log('Пост удален', newSocialBook.removePost("-s19a6hqce", "-5sgljaskg"));
console.log('Сумма лайков', newSocialBook.getAllLikes("-e51cpd4di"));
console.log("Добавил лайк", newSocialBook.addPostLike("-e51cpd4di", "-i03pbhy3s"));
console.log("Всего постов", newSocialBook.getPostsCount("-s19a6hqce"));
