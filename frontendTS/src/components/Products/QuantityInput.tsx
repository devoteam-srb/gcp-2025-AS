import './QuantityInput.css';

interface QuantityInputProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}

export function QuantityInput({
  quantity,
  setQuantity,
  stock,
}: QuantityInputProps) {
  return (
    <>
      <button
        className="quantity_input_button"
        disabled={quantity <= 1}
        onClick={() => setQuantity(quantity - 1)}
      >
        -
      </button>
      <p className="quantity_input_count"> {quantity}</p>
      <button
        className="quantity_input_button"
        disabled={quantity >= stock}
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </>
  );
}
