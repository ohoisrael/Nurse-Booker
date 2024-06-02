// bookingController.js
import Nurse from '../models/NurseSchema.js';
import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.nurseId);
        const user = await User.findById(req.userId);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/nurses/${nurse.id}`,
            customer_email: user.email,
            client_reference_id: req.params.nurseId,
            line_items: [
                {
                    price_data: {
                        currency: 'USD', // Change currency if not BDT
                        unit_amount: nurse.ticketPrice * 100,
                        product_data: {
                            name: nurse.name,
                            description: nurse.bio,
                            images: [nurse.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        });

        const booking = new Booking({
            nurse: nurse._id,
            user: user._id,
            ticketPrice: nurse.ticketPrice,
            session: session.id // Corrected session ID access
        });

        await booking.save();

        res.status(200).json({ success: true, message: 'Successfully paid', session: session });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error creating checkout session' });
    }
};
