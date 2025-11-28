"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { format } from "date-fns";
import Joi from "joi";

import {
  nameRule,
  phoneRule,
  addressRule,
  } from "@/lib/validations/ValidationRules";
import Image from "next/image";

// -------------------- TIME PICKER --------------------
export function TimePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (time: string) => void;
}) {
  const [hour, setHour] = useState<number | null>(null);
  const [minute, setMinute] = useState<number | null>(null);
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");

  React.useEffect(() => {
    if (hour !== null && minute !== null && onChange) {
      const formatted = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${ampm}`;
      onChange(formatted);
    }
  }, [hour, minute, ampm]);

  const handleSelect = () => {
    if (hour !== null && minute !== null) {
      const formatted = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${ampm}`;
      onChange?.(formatted);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-black border-gray-400 hover:bg-gray-50"
        >
          {value || "Select Time"}
          <Clock className="w-4 h-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-4 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-700">Hour</label>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              onChange={(e) => setHour(Number(e.target.value))}
              value={hour ?? ""}
            >
              <option value="">--</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-700">Minute</label>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              onChange={(e) => setMinute(Number(e.target.value))}
              value={minute ?? ""}
            >
              <option value="">--</option>
              {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                <option key={m} value={m}>
                  {m.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-700">AM/PM</label>
            <select
              className="border rounded-md px-2 py-1 text-sm"
              onChange={(e) => setAmpm(e.target.value as "AM" | "PM")}
              value={ampm}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <Button
            onClick={handleSelect}
            className="w-full bg-blue-800 text-white hover:bg-blue-700"
          >
            Set Time
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default function ContactForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    institute: "",
    location: "",
    categories: [] as string[],
    date: undefined as Date | undefined,

    time: "" ,
    query: "",
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const allCategories = [
    "Kindergarten / Play School",
    "School",
    "Tuition Center",
    "Intermediate / Plus Two",
    "UG / PG College or University",
    "Coaching Center",
    "Upskilling / Training Center",
    "Test Prep / Study Abroad Consultancy",
  ];

  // ✅ Joi Schema
  const scheduleDemoSchema = Joi.object({
    name: nameRule,
    phone: phoneRule,
    email: Joi.string().email({ tlds: false }).required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    institute: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Institute name is required",
    }),
    location: addressRule,
    categories: Joi.array().min(1).required().messages({
      "array.min": "Please select at least one category",
    }),
    date: Joi.date().required().messages({
      "any.required": "Please select a date",
    }),

    time: Joi.string().required().messages({
      "string.empty": "Please select a time",
    }),
    query: Joi.string().allow("").max(500).messages({
      "string.max": "Queries cannot exceed 500 characters",
    }),
  });
  type FieldValue = string | string[] | undefined | Date;
  // ✅ Field-level validation
  const validateField = (key: string, value: FieldValue) => {
    const fieldSchema = scheduleDemoSchema.extract(key);
    const { error } = fieldSchema.validate(value);
    setErrors((prev) => ({
      ...prev,
      [key]: error ? error.details[0].message : undefined,
    }));
  };

  // ✅ Input handler with live validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value); // live validate field
  };

  const toggleCategory = (category: string) => {
    const updated = formData.categories.includes(category)
      ? formData.categories.filter((c) => c !== category)
      : [...formData.categories, category];

    setFormData((prev) => ({ ...prev, categories: updated }));
    validateField("categories", updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = scheduleDemoSchema.validate(formData, { abortEarly: false });
  const validationErrors: Record<string, string | undefined> = {};

  if (error) {
    error.details.forEach((detail) => {
      validationErrors[detail.context?.key || ""] = detail.message;
    });
    setErrors(validationErrors);
    console.log(validationErrors);
    console.log(formData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    setErrors({});

    try {
      const formDataToSend = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, // 🔹 Replace with your Web3Forms key
        subject: "New Demo Request - TOOCLARITY",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        institute: formData.institute,
        location: formData.location,
        categories: formData.categories.join(", "),
        date: formData.date ? format(formData.date, "PPP") : "",
        time: formData.time || "No time provided",
        query: formData.query || "No query provided",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Success — redirect or show message
        router.push("/contactUs/thank-you");
      } else {
        alert("Something went wrong while sending your message. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred. Please try again later.");
    }
  }
};

  return (
    <section className="flex flex-col justify-center px-4 py-12">
      <div className="mb-6 flex justify-center">

     {/* //svg */}
     <Image src="/TCNewLogo.jpg" alt ="TCNew Logo" width={150} height={150} className="w-auto h-auto object-contain"/>

       
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 text-center">
        Schedule a Demo (TOOClARITY)
      </h1>

      <div className="max-w-2xl mb-10 text-center mx-auto">
        <p className="text-gray-700 text-base sm:text-lg">
          Learn how your institution can be <b>seen, trusted, and chosen</b> by
          the right students. Discover how our transparent platform enhances
          visibility, builds credibility, and drives genuine student engagement.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto flex flex-col gap-6 text-black"
      >
        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-2xl">
            Your Name *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Answer"
            className="w-full h-12 border-black"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-2xl">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Answer"
            className="w-full h-12 border-black"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-2xl">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Answer"
            className="w-full h-12 border-black"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Institute */}
        <div>
          <Label htmlFor="institute" className="text-2xl">
            Institute Name *
          </Label>
          <Input
            id="institute"
            value={formData.institute}
            onChange={handleChange}
            placeholder="Your Answer"
            className="w-full h-12 border-black"
          />
          {errors.institute && (
            <p className="text-red-600 text-sm mt-1">{errors.institute}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-2xl">
            Location / Address *
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Your Answer"
            className="w-full h-12 border-black"
          />
          {errors.location && (
            <p className="text-red-600 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Categories */}
        <div>
          <Label className="text-2xl">Institute Categories *</Label>
          <p className="text-sm">(Select all that apply)</p>
          <div className="grid grid-cols-1 gap-3 mt-3">
            {allCategories.map((category) => (
              <label
                key={category}
                className={`flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${
                  formData.categories.includes(category)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <Checkbox
                  checked={formData.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="text-red-600 text-sm mt-1">{errors.categories}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <Label className="text-2xl">Schedule Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center border-black text-black"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                {formData.date ? format(formData.date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => {
                  setFormData({ ...formData, date });
                  validateField("date", date);
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Time */}
        <div>
          <Label className="text-2xl">Select Time *</Label>
          <TimePicker
            value={formData.time}
            onChange={(time) => {
              setFormData({ ...formData, time });
              validateField("time", time);
            }}
          />
          {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
        </div>

        {/* Query */}
        <div>
          <Label htmlFor="query" className="text-2xl">
            Write down any Queries if you have?
          </Label>
          <Textarea
            id="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Your Answer"
            className="w-full border-black"
          />
          {errors.query && (
            <p className="text-red-600 text-sm mt-1">{errors.query}</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          type="submit"
          className="bg-black text-white w-full h-12 text-lg rounded-xl"
        >
          Submit
        </Button>
      </form>
    </section>
  );
}


 