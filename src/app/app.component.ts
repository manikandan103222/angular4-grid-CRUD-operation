import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    //1. Template Ref types 
    @ViewChild('readOnlyTemplate')readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate')editTemplate: TemplateRef<any>;
    //2. Other Variables
    message: string;
    employee: Employee;
    selemp: Employee;
    employees: Array<Employee>;
    isNewRecord: boolean;
    statusMessage: string;
    //3. Constructor injected with the Service Dependency
    constructor() {
        this.employees = new Array<Employee>();
        this.message = 'Grid CRUD Operation In Angular 4';
    }
    //4. Load all Employees
    ngOnInit() {
        console.log(this.selemp);
        this.loadEmployee();
    }

    private loadEmployee() {
        if (this.employees.length === 0) {
            this.employees = [{ _id: "1", EmpNo: 1, EmpName: "Kumar", Salary: 40000, DeptName: "Java", Designation: "Software Engineer" }];  
        } else {
            this.employees = this.employees;
        }
    }

    //5. Add Employee
    addEmp() {
        this.selemp = new Employee('', 0, '', 0, '', '');
        this.employees.push(this.selemp);
        this.isNewRecord = true;
    }

    //6. Edit Employee
    editEmployee(emp: Employee) {
        this.selemp = emp;
    }

    //7. Load either Read-Onoy Template or EditTemplate
    loadTemplate(emp: Employee) {
        if (this.selemp && this.selemp.EmpNo == emp.EmpNo) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    //8. Save Employee
    saveEmp() {
        if (this.isNewRecord) {
            //add a new Employee
            this.employee = this.selemp;
            let employeeCount = this.employees.length;
            this.employees.forEach(function (value) {
                if (value._id == "") {
                    value._id = employeeCount.toString();
                }
            })
            this.isNewRecord = false;
            this.selemp = null;

        } else {
            let self = this;
            this.employees.forEach(function (value) {
                if (value._id == self.selemp._id) {
                    value.EmpNo = self.selemp.EmpNo;
                    value.EmpName = self.selemp.EmpName;
                    value.Salary = self.selemp.Salary;
                    value.DeptName = self.selemp.DeptName;
                    value.Designation = self.selemp.Designation;
                }
            })
            this.selemp = null;
        }
        this.loadEmployee();
    }

    //9. Cancel edit
    cancel() {
        this.selemp = null;
    }

    //10 Delete Employee
    deleteEmp(emp: Employee) {
        this.employees = this.employees.filter(function (value) {
            if (value._id != emp._id) {
                return value;
            }
        });
        this.loadEmployee();
    }

}
