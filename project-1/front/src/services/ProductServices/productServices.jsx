import { API } from "../../api/api";

class ProductService {
  createProduct(product) {
    return API.post(`/addProduct`, product);
  }

  getProduct() {
    return API.get(`/productsList`);
  }
}

export default new ProductService();
