import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableEditComponent implements OnInit {

  private _element: any;

  @Output()
  elementChange = new EventEmitter<any>();

  get user() {
    return this._element;
  }

  @Input()
  set user(newVal: User) {
    if (this._element === newVal) { return; }
    this._element = newVal;
    this.ref.markForCheck();
    this.elementChange.emit(this._element);
  }

  private elementDiffer: KeyValueDiffer<string, any>;

  detailForm: FormGroup;
  userRef: User;
  detailId: number;
  submitted = false;
  closeResult: string = '';
  numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

  constructor(
    private formBuilder: FormBuilder,
    private _service: UserService,
    private ref: ChangeDetectorRef,
    private differs: KeyValueDiffers,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.elementDiffer = this.differs.find({}).create();
  }

  ngOnInit(): void {
    this.onCreate();
  }

  ngDoCheck() {
    const changes = this.elementDiffer.diff(this.user);
    if (changes) {
      this.user = { ...this.user };
      this.getDataById(this.user);
    }
  }

  onCreate() {
    this.detailForm = this.formBuilder.group({
      id: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      username: [''],
      password: ['']
    });
  }

  getDataById(user: User) {
    this.detailForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
    });
  }

  get f() { return this.detailForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.detailForm.invalid) {
      return;
    }

    this.userRef = this.detailForm.value;

    setTimeout(() => {
      this._service.updateUser(this.user.id, this.userRef).subscribe(response => {
        console.log(response);
        this.document.location.reload();
      });
    }, 2000);
    
  }

}
