import { API } from "../../api/api";

class ProductService {
  createProduct(product) {
    return API.post(`/addProduct`, product);
  }

  getProduct() {
    return API.get(`/productsList`);
  }

  deleteById(id){
    return API.post(`/deleteProduct/${id}`)
  }
}

export default new ProductService();
