"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriesRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var category_form_component_1 = require("./category-form/category-form.component");
var category_list_component_1 = require("./category-list/category-list.component");
var routes = [
    {
        path: '',
        component: category_list_component_1.CategoryListComponent
    },
    {
        path: 'new',
        component: category_form_component_1.CategoryFormComponent
    },
    {
        path: ':id/edit',
        component: category_form_component_1.CategoryFormComponent
    }
];
var CategoriesRoutingModule = /** @class */ (function () {
    function CategoriesRoutingModule() {
    }
    CategoriesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CategoriesRoutingModule);
    return CategoriesRoutingModule;
}());
exports.CategoriesRoutingModule = CategoriesRoutingModule;
