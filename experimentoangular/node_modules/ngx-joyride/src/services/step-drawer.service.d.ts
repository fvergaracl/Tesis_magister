import { ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { JoyrideStep } from '../models/joyride-step.class';
export declare class StepDrawerService {
    private readonly componentFactoryResolver;
    private appRef;
    private injector;
    private refMap;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    draw(step: JoyrideStep): void;
    remove(step: JoyrideStep): void;
}
