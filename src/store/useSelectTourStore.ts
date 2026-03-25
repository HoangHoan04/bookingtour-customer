import { create } from "zustand";
import { type TourDto } from "@/dto/tour.dto";
import type { TourDetail } from "@/dto/tour.dto";

interface SelectTourState {
  selectedTour: TourDto | null;
  selectedTourDetail: TourDetail | null;
  setSelectedTour: (tour: TourDto | null) => void;
  setSelectedTourDetail: (tourDetail: TourDetail | null) => void;
}

export const useSelectTourStore = create<SelectTourState>()((set) => ({
  selectedTour: null,
  selectedTourDetail: null,
  setSelectedTour: (tour) => set({ selectedTour: tour }),
  setSelectedTourDetail: (tourDetail) =>
    set({ selectedTourDetail: tourDetail }),
}));
