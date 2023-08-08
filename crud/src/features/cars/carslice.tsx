import axios from 'axios';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
 
export const fetchALLCars = createAsyncThunk("cars/getAPI", async () => {
    const response = await axios.get("http://localhost:4000/cars");
    return response.data;
});

export const saveNewCar = createAsyncThunk("cars/createAPI", async (payload:any) => {
    const response = await axios.post("http://localhost:4000/cars", payload);
    return response.data;
});

export const updateCar = createAsyncThunk("cars/updateAPI", async (payload:any) => {
    const response = await axios.put(`http://localhost:4000/cars/${payload.id}`,payload);
    return response.data;
  });

export const deleteCar = createAsyncThunk("cars/deleteAPI", async (id:any) => {
    const response = await axios.delete(`http://localhost:4000/cars/${id}`);
    return id;
  });

const initialState = {
  carsData: [],
  loading: "idle",
};
 
const carslice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder.addCase(fetchALLCars.pending, (state:any, action:any) => {
        state.loading = "pending";
    });
    builder.addCase(fetchALLCars.fulfilled, (state:any, action:any) => {
        state.loading = "idle";
        state.carsData = action.payload;
    });
    builder.addCase(saveNewCar.pending, (state:any, action:any) => {
        state.loading = "pending";
    });
    builder.addCase(saveNewCar.fulfilled, (state:any, action:any) => {
        state.loading = "idle";
        state.carsData.unshift(action.payload);
    });
    builder.addCase(updateCar.pending, (state:any) => {
        state.loading = "pending";
    });
    builder.addCase(updateCar.fulfilled, (state:any, action:any) => {
        state.loading = "idle";
        state.carsData = state.carsData.filter((_:any) => _.id !== action.payload.id);
        state.carsData.unshift(action.payload); //overwrite the existing data with the updated data
    });
    builder.addCase(deleteCar.pending, (state:any) => {
      state.loading = "pending";
    });
    builder.addCase(deleteCar.fulfilled, (state:any, action:any) => {
      state.loading = "idle";
      state.carsData = state.carsData.filter((_:any) => _.id !== action.payload);
    });
  },
});
 


export const getAllCars = (state:any) => state.car.carsData;
export const getLoading = (state:any) => state.car.loading;
export const getCarById = (id:number) => {
    return (state:any) => state.car.carsData.filter((_:any) => _.id === id)[0];
  };

export default carslice.reducer;
