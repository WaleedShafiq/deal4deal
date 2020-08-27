import { Prize } from './prize';
import { Product } from './product';

export class Campagin {
  id: number;
  total_num_of_sells: number;
  status: string;
  image: string;
  sold: number;
  product: Product;
  wished: string;
  prize: Prize;
  wishlist_id: number;
    // constructor(total_num_of_sells: number) {
    //     this.totalNumOfSells = total_num_of_sells;
    // }

}
