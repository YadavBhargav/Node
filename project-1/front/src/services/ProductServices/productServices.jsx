import { API } from "../../api/api";

class ProductService {
  createProduct(product) {
    return API.post(`/addProduct`, product);
  }

  updateProduct(product) {
    return API.post(`/updateProduct`, product);
  }

  getProduct() {
    return API.get(`/productsList`);
  }

  getProductById(id) {
    return API.get(`getProduct/${id}`);
  }

  deleteById(id) {
    return API.post(`/deleteProduct/${id}`);
  }
}

export default new ProductService();
