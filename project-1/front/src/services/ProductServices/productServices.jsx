import { API } from "../../api/api";

class ProductService {
  createProduct(product) {
    return API.post(`/addProduct`, product);
  }
}

export default new ProductService();
