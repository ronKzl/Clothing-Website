import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}
  @Input() header!: string;
  @Input() display: boolean = false;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  @Output() confirm = new EventEmitter<Product>();
  @Output() displayChange = new EventEmitter<boolean>();

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    const {name,image,price,rating} = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
