function PostsViewModel() {
  const self = this;

  self.posts = ko.observableArray([]);
  self.userCompanyCode = ko.observable(
    localStorage.getItem("companyCode") || ""
  );
  self.searchText = ko.observable("");
  self.userEmail = ko.observable(localStorage.getItem("userEmail") || "");

  //get data from api
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      // if changed  spesific post ,get updated post into localStorage and change post list
      const updatedPost = JSON.parse(localStorage.getItem("selectedPost"));
      if (updatedPost) {
        const index = data.findIndex((p) => p.id === updatedPost.id);
        if (index !== -1) {
          data[index] = updatedPost;
        }
      }
      self.posts(data);
    })
    .catch((error) => console.error("Postlar alınamadı:", error));

  self.filteredPosts = ko.computed(() => {
    const query = self.searchText().toLowerCase();
    return self
      .posts()
      .filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query)
      );
  });

  self.goToDetail = function (post) {
    localStorage.setItem(
      "selectedPost",
      JSON.stringify({
        id: post.id,
        title: post.title,
        body: post.body,
      })
    );
    window.location.href = "post-detail.html";
  };
}
