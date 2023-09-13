var app_type = ZDK.Page.getField("Type").getValue();
var app_stage = ZDK.Page.getField("New_Resident_Visa_Stage").getValue();


if (app_type == "New Trade License")
{
    if (app_stage == "Start")
    {
        log("Stage: " + app_stage);
        var application_id = $Page.record_id;
        log("App ID: " + application_id);
        var parameters = {};
        var headers = {};

        var app_details = ZDK.Apps.CRM.Applications1.fetchById(application_id);
        var tc_and_other_files = app_details.Terms_and_Conditions;
        log("Terms and conditions: " + tc_and_other_files);
        if (tc_and_other_files != null)
        {
            var application_new_license_form = ZDK.Apps.CRM.Connections.invoke("all_crm_modules", "https://www.zohoapis.com/crm/v2/Applications1/" + application_id + "/New_License_Application1", "GET", 1, parameters, headers);
            var application_company_members = ZDK.Apps.CRM.Connections.invoke("all_crm_modules", "https://www.zohoapis.com/crm/v2/Applications1/" + application_id + "/Company_Members", "GET", 1, parameters, headers);
            var application_new_license_forms_string = JSON.stringify(application_new_license_form);
            var application_company_members_string = JSON.stringify(application_company_members);
            log("App New License Stringify: " + application_new_license_forms_string);
            log("App Company Members Stringify: " + application_company_members_string);
            if (application_new_license_forms_string.includes("data") && application_company_members_string.includes("data"))
            {
                const business_activity_1 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].first_Business_Activity);
                const business_activity_name_1 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].first_Business_Activity_Name);
                const business_activity_2 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].second_Business_Activity);
                const business_activity_name_2 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].second_Business_Activity_Name);
                const business_activity_3 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].third_Business_Activity);
                const business_activity_name_3 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].third_Business_Activity_Name);
                const business_activity_4 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].forth_Business_Activity);
                const business_activity_name_4 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].forth_Business_Activity_Name);
                const business_activity_5 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].fifth_Business_Activity);
                const business_activity_name_5 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].fifth_Business_Activity_Name);
                const business_activity_6 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].sixth_Business_Activity);
                const business_activity_name_6 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].sixth_Business_Activity_Name);
                const business_activity_7 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].seventh_Business_Activity);
                const business_activity_name_7 = JSON.stringify(application_new_license_form._details.statusMessage.data[0].seventh_Business_Activity_Name);
                

                const nlf_valid = JSON.stringify(application_new_license_form._details.statusMessage.data[0].NLF_Valid);
                const number_of_shares = JSON.stringify(application_new_license_form._details.statusMessage.data[0].Number_of_Shares);
                const total_share_capital = JSON.stringify(application_new_license_form._details.statusMessage.data[0].Total_Share_Capital);
                const number_of_shareholder = JSON.stringify(application_new_license_form._details.statusMessage.data[0].Number_of_Shareholders);
                const share_value = JSON.stringify(application_new_license_form._details.statusMessage.data[0].Share_Value);            
                log("Number of Shares: " + number_of_shares);
                log("Number of Shareholder: " + number_of_shareholder)
                var company_members = application_company_members._details.statusMessage.data;
                var company_member_length =   company_members.length;
                log("Company Members Length: " + company_member_length);
                var sum_of_number_of_share = 0;
                var cm_valid_counter = 0;
                var total_passport = 0;
                var gm_counter = 0;
                var ifza_t_and_c_counter = 0;
                var tlz_t_and_c_counter = 0;
                var ifza_office_pricing_counter = 0;
                var ifza_property_pricelist_counter = 0;
                var shareholder_counter = 0;
                company_members.forEach(function (company_member) {
                if (company_member.Roles_s.includes("Shareholder"))
                {
                    shareholder_counter = shareholder_counter + 1;
                }

                //Get the Number of share of Shareholders
                sum_of_number_of_share = sum_of_number_of_share + company_member.Number_of_Shares;
                
                //validate and count the CM valid field
                if ( company_member.CM_Valid == true)
                {
                    cm_valid_counter = cm_valid_counter + 1;
                }
                //validate and count passport files
                if ( company_member.Passport_file != undefined && company_member.Passport_file != "")
                {
                    total_passport = total_passport + 1;
                }
                //Not available right now, under Development roadmap
                log("Roles: " + company_member.Role_s);
                if (company_member.Roles_s.includes("General Manager") )
                {
                    gm_counter = gm_counter + 1;
                }});

                // log("Shareholder Counter: " + shareholder_counter)
                // ZDK.Client.showAlert('Shareholder Counter: ' + shareholder_counter);
                //terms and condition files loop
                var application_upload_files = JSON.stringify(tc_and_other_files);
                tc_and_other_files.forEach(function (tc_and_other_file) {
                    if (tc_and_other_file.file_Name.includes("IFZA") && tc_and_other_file.file_Name.includes("T&C"))
                    {
                        ifza_t_and_c_counter = ifza_t_and_c_counter + 1;
                    }

                    if (tc_and_other_file.file_Name.includes("Trade License Zone")  && tc_and_other_file.file_Name.includes("Conditions"))
                    {
                        tlz_t_and_c_counter = tlz_t_and_c_counter + 1;
                        log("TLZ TC Count: " + ifza_t_and_c_counter);
                    }

                    if (tc_and_other_file.file_Name.includes("IFZA")  && tc_and_other_file.file_Name.includes("Office Pricing") && tc_and_other_file.file_Name.includes("Visa Licenses") && tc_and_other_file.file_Name.includes("plus"))
                    {
                        ifza_office_pricing_counter = ifza_office_pricing_counter + 1;
                    }

                    if (tc_and_other_file.file_Name.includes("IFZA") && tc_and_other_file.file_Name.includes("Property Price List"))
                    {
                        ifza_property_pricelist_counter = ifza_property_pricelist_counter + 1;
                    }
                });
                    
                log("Sum of Number of Shares: " + sum_of_number_of_share);
                log("Total CM Valid Counter : " + cm_valid_counter);

              

                //Number of Shares validation
                if ( number_of_shares != sum_of_number_of_share)
                {
                    ZDK.Client.showMessage('Number of Share is not equal.', { type: 'error' });
                    return false;
                }

                //Number of Shareholder validation
                if ( number_of_shareholder != shareholder_counter)
                {
                    ZDK.Client.showMessage('Number of Shareholders is not equal', { type: 'error' });
                    return false;
                }

                //Company Member Valid Counter Validation
                if ( cm_valid_counter != company_member_length)
                {
                    ZDK.Client.showMessage('Some Company Members are not valid', { type: 'error' });
                    return false;
                }

                //Total Passport Validation
                if ( total_passport != company_member_length)
                {
                    ZDK.Client.showMessage('Some Company Members have blank Passport File field.', { type: 'error' });
                    return false;
                }


                //Terms and Condition File Validation
                log("Terms and Conditions: " + tc_and_other_files)
                if ( tc_and_other_files == null)
                {
                    ZDK.Client.showMessage('Terms and Conditions field is empty.', { type: 'error' });
                    return false;
                }


                //IFZA T&C Validation
                if ( ifza_t_and_c_counter == 0)
                {
                    ZDK.Client.showMessage('IFZA Terms and Conditions file is not added.', { type: 'error' });
                    return false;
                }

                //TLZ T&C Validation
                if ( tlz_t_and_c_counter == 0)
                {
                    ZDK.Client.showMessage('TLZ Terms and Conditions file is not added.', { type: 'error' });
                    return false;
                }

                //IFZA Office Pricing Validation
                if ( ifza_office_pricing_counter == 0)
                {
                    ZDK.Client.showMessage('IFZA Office Pricing file is not added.', { type: 'error' });
                    return false;
                }

                //IFZA Property Pricelist validation
                if ( ifza_property_pricelist_counter == 0)
                {
                    ZDK.Client.showMessage('IFZA Property List file is not added.', { type: 'error' });
                    return false;
                }

                //Number of Shareholder validation
                log("Number of Shareholders - validation: " + number_of_shareholder)
                if (number_of_shareholder != null || number_of_shareholder != undefined)
                {
                    if (number_of_shareholder >= 1 && number_of_shareholder <= 50)
                    {
                        
                    }
                    else
                    {
                        ZDK.Client.showMessage("The 'Number of Shareholder' should be whole number from 1-50.", { type: 'error' });
                        return false;
                    }
                }

                //Total Share Capital value validation
                let tsc_reminder = total_share_capital % 1000;
                log("Total Share Capital - validation: "+ total_share_capital)
                if (total_share_capital != null || total_share_capital != undefined)
                {
                    if ((total_share_capital >= 10000 && total_share_capital <= 10000000) && (tsc_reminder == 0))
                    {
                    

                    }
                    else
                    {
                        ZDK.Client.showMessage("The 'Total Share Capital' should be whole number from 10,000 - 10,000,000. And should be in multiples of 1,000", { type: 'error' });
                        return false;
                    }
                }

                //Total Share Value validation
                if (share_value != null || share_value != undefined)
                {
                    if ((share_value >= 10 && share_value < total_share_capital))
                    {       
                    }
                    else {
                        //Show an error of Share Value
                        ZDK.Client.showMessage("The 'Share Value' should be whole number. The value should be greater than or equal to 10 but less than total share capital", { type: 'error' });
                        return false;
                    }
                }
                let total_number_of_shares = total_share_capital / share_value;
                //Calculate Share capital per shareholder
                log("Total Number of Shares: " + total_number_of_shares);


                //Get the Total Number of Shares
                if (total_number_of_shares %  1 === 0)
                {

                }
                else
                {
                    //Show an error of Number of Shares
                    ZDK.Client.showMessage('The Number of Shares is: ' + total_number_of_shares +  ' and not a whole number', { type: 'error' });
                    return false;
                }

           
                //NLF Validation
                if ( nlf_valid != "true")
                {
                    ZDK.Client.showMessage('New License Form is not valid.', { type: 'error' });
                    return false;
                }

                //Business Activities Validation
         
                if (business_activity_1 != 'null' && business_activity_name_1 === 'null')
                {
                    ZDK.Client.showMessage('First Business Activity Name is empty', { type: 'error' });
                    return false;
                }

                if (business_activity_2 != "null" && business_activity_name_2 ===  'null')
                {
                    ZDK.Client.showMessage('Second Business Activity Name is empty', { type: 'error' });
                    return false;
                }

                if (business_activity_3 != 'null' && business_activity_name_3 === 'null')
                {
                    ZDK.Client.showMessage('Third Business Activity Name is empty', { type: 'error' });
                    return false;
                }

                if (business_activity_4 != 'null' && business_activity_name_4 === 'null')
                {
                    ZDK.Client.showMessage('Forth Business Activity Name is empty', { type: 'error' });
                    return false;
                }

                if (business_activity_5 != 'null' && business_activity_name_5 === 'null')
                {
                    ZDK.Client.showMessage('Fifth Business Activity Name is empty', { type: 'error' });
                    return false;
                }

                if (business_activity_6 != 'null' && business_activity_name_6 === 'null')
                {
                    ZDK.Client.showMessage('Sixth Business Activity Name is empty', { type: 'error' });
                    return false;
                }

                if (business_activity_7 != 'null' && business_activity_name_7 === 'null')
                {
                    ZDK.Client.showMessage('Seventh Business Activity Name is empty', { type: 'error' });
                    return false;
                }

            }
            else
            {
                ZDK.Client.showMessage('Error! Either New License Application or Company Members module is empty.', { type: 'error' });
                return false;
            }
        }
        else
        {
            ZDK.Client.showMessage('T&Cs For Signing file upload is empty.', { type: 'error' });
            return false;
        }   
    }
}



