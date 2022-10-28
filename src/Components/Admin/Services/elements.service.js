import http from "../../../http-common";

class ElementDataService {
  createElement(data) {
    return http.post("/element", data);
  }

  updateElement(data) {
    return http.put("/element", data);
  }

  deleteElement(data) {
     return http.delete("/element", {
      data: { post_id: data.post_id, element_index: data.element_index },
    });
  }
}

export default new ElementDataService();
