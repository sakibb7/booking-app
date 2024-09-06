import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../config/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../../api-client";
import { useAppContext } from "../../../context/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
};

export default function BookingForm({ currentUser, paymentIntent }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: apiClient.createRoomBooking,
    onSuccess: async () => {
      showToast({ message: "Book room Successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    console.log("this function ran", result.paymentIntent?.status);
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name
          <input type="text" readOnly disabled {...register("firstName")} />
        </label>
        <label>
          Last Name
          <input type="text" readOnly disabled {...register("lastName")} />
        </label>
        <label>
          Email
          <input type="text" readOnly disabled {...register("email")} />
        </label>
        <div className="">
          total cost: ${paymentIntent.totalCost.toFixed(2)}
        </div>
        <div className="">
          <CardElement id="payment-element" className="border p-2 rounded-xl" />
        </div>

        <button type="submit">{isPending ? "Booking..." : "Pay Amount"}</button>
      </form>
    </div>
  );
}
