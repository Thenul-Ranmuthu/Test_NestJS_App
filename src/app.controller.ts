import { Controller, Get, Logger } from "@nestjs/common";

@Controller()
export class HomeController{
    private logger = new Logger(HomeController.name)
    @Get()
    greetingController(){
        this.logger.log(`Received HOME!!!`);
        return {
            status: "App Started!!"
        }
    }
}