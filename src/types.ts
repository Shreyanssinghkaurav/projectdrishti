export type Cuisine = 'italian' | 'indian' | 'japanese' | 'mexican' | 'american';

export type DietaryRestriction = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'none';

export type UserRole = 'admin' | 'user';

export interface User {
  _id: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface TimeSlot {
  id: string;
  time: string;
  isBooked: boolean;
  bookedBy?: string;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  cuisine: Cuisine;
  dietaryRestrictions: DietaryRestriction[];
  restaurantId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  dishes: Dish[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  timeSlots: TimeSlot[];
}

// MongoDB Schemas (for your desktop implementation)
export const mongoSchemas = `
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Time Slot Schema
const timeSlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  timeSlots: [timeSlotSchema],
  dishes: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    cuisine: { 
      type: String, 
      enum: ['italian', 'indian', 'japanese', 'mexican', 'american'],
      required: true 
    },
    dietaryRestrictions: [{
      type: String,
      enum: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'none']
    }]
  }]
});
`;