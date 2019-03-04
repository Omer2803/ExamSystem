import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import { ExaminedComponent } from './components/examined/examined.component';
import { ExamComponent } from './components/exam/exam.component';
import { ChooseExamComponent } from './components/exams-components/choose-exam/choose-exam.component';
import { ExamineeFormComponent } from './components/Login/examinee-form/examinee-form.component';
import { ExamResultComponent } from './components/exam-result/exam-result.component';
import { ExamReportComponent } from './components/report-components/exam-report/exam-report.component';

const routes: Routes = [
  { path: 'register', component: RegisterAdminComponent },
  { path: 'mainmenu', component: MainMenuComponent },
  { path: 'login', component: LoginAdminComponent },
  { path: 'restorePassword', component: RestorePasswordComponent },
  { path: 'questionList', component: QuestionListComponent },
  { path: 'testsList', component: TestListComponent },
  { path: 'testForm', component: TestFormComponent },
  { path: 'questionForm', component: QuestionFormComponent },
  { path: 'examined', component: ExaminedComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'examResult', component: ExamResultComponent },
  { path: 'chooseExam', component: ChooseExamComponent },
  { path: 'examineeForm', component: ExamineeFormComponent },
  { path: 'examReport', component: ExamReportComponent },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

