import { defineStore } from 'pinia';
import { serviceCategories } from '~/data/services';
import { submitRequest, callTimeOptions, type RequestPayload } from '~/data/request';

interface RequestFormData {
  categoryId: string | null;
  subIndex: number | null;
  objectType: string;
  city: string;
  address: string;
  additionalInfo: string;
  fullName: string;
  phone: string;
  email: string;
  contactMethod: string;
  callTime: string;
  agreement: boolean;
}

export const useRequestStore = defineStore('request', {
  state: () => ({
    currentStep: 0,
    isSubmitting: false,
    submitError: false,
    errors: {
      service: '',
      objectType: '',
      city: '',
      fullName: '',
      phone: '',
      email: '',
      contactMethod: '',
      agreement: '',
    },
    formData: {
      categoryId: null,
      subIndex: null,
      objectType: '',
      city: '',
      address: '',
      additionalInfo: '',
      fullName: '',
      phone: '',
      email: '',
      contactMethod: 'phone',
      callTime: 'any',
      agreement: false,
    } as RequestFormData,
  }),

  actions: {
    setCurrentStep(step: number) {
      this.currentStep = step;
    },

    nextStep() {
      if (this.validateStep()) {
        setTimeout(() => {
          this.currentStep++;
        }, 50);
      }
    },

    prevStep() {
      setTimeout(() => {
        this.currentStep--;
      }, 50);
    },

    setCategory(categoryId: string) {
      this.formData.categoryId = categoryId;
      this.formData.subIndex = null;
    },

    setSubService(index: number) {
      this.formData.subIndex = index;
    },

    setObjectType(type: string) {
      this.formData.objectType = type;
    },

    setAddress(address: string) {
      this.formData.address = address;
    },

    setCity(city: string) {
      this.formData.city = city;
    },

    setAdditionalInfo(info: string) {
      this.formData.additionalInfo = info;
    },

    setFullName(name: string) {
      this.formData.fullName = name;
    },

    setPhone(phone: string) {
      this.formData.phone = phone;
    },

    setEmail(email: string) {
      this.formData.email = email;
    },

    setContactMethod(method: string) {
      this.formData.contactMethod = method;
    },

    setCallTime(time: string) {
      this.formData.callTime = time;
    },

    setAgreement(value: boolean) {
      this.formData.agreement = value;
    },

    resetErrors() {
      for (const key in this.errors) {
        this.errors[key as keyof typeof this.errors] = '';
      }
    },

    validateStep(): boolean {
      let isValid = true;
      this.resetErrors();

      if (this.currentStep === 0) {
        if (!this.formData.categoryId) {
          this.errors.service = 'Выберите направление работ';
          isValid = false;
        }
      } else if (this.currentStep === 1) {
        if (!this.formData.objectType) {
          this.errors.objectType = 'Выберите тип объекта';
          isValid = false;
        }
        if (!this.formData.city) {
          this.errors.city = 'Выберите населённый пункт';
          isValid = false;
        }
      } else if (this.currentStep === 2) {
        if (!this.formData.fullName) {
          this.errors.fullName = 'Введите ваше имя';
          isValid = false;
        }

        if (!this.formData.phone) {
          this.errors.phone = 'Введите ваш телефон';
          isValid = false;
        } else if (this.formData.phone.length < 12 || !this.formData.phone.startsWith('+7')) {
          this.errors.phone = 'Введите корректный номер телефона';
          isValid = false;
        }

        if (this.formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
          this.errors.email = 'Введите корректный email';
          isValid = false;
        }
      } else if (this.currentStep === 3) {
        if (!this.formData.agreement) {
          this.errors.agreement = 'Необходимо согласие на обработку персональных данных';
          isValid = false;
        }
      }

      return isValid;
    },

    getCategory() {
      return serviceCategories.find((c) => c.id === this.formData.categoryId) || null;
    },

    getSubService() {
      const cat = this.getCategory();
      if (!cat || this.formData.subIndex === null) return null;
      return cat.sub[this.formData.subIndex] || null;
    },

    async submitForm() {
      if (!this.validateStep()) return;

      this.isSubmitting = true;
      this.submitError = false;

      try {
        const cat = this.getCategory();
        const sub = this.getSubService();
        const callTimeLabel = callTimeOptions.find((c) => c.value === this.formData.callTime)?.text || '';
        const additionalInfo = [this.formData.additionalInfo, callTimeLabel && `Удобное время звонка: ${callTimeLabel}`]
          .filter(Boolean)
          .join('. ');

        const requestData: RequestPayload = {
          service: cat?.n || '',
          serviceType: sub?.n || '',
          objectType: this.formData.objectType,
          address: this.formData.address,
          city: this.formData.city,
          additionalInfo,
          fullName: this.formData.fullName,
          phone: this.formData.phone,
          email: this.formData.email,
          contactMethod: this.formData.contactMethod,
        };

        const response = await submitRequest(requestData);

        if (!response.ok) {
          throw new Error('Ошибка при отправке данных');
        }

        this.currentStep = 4;
      } catch (error) {
        console.error('Ошибка при отправке заявки:', error);
        this.submitError = true;
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
