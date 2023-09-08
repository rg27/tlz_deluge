var tit = ZDK.Page.getField('Title');
tit.setMandatory(true);
var record_number = ZDK.Page.getField('Member_Record_Number').getValue();
if (record_number == "" || record_number == null)
{
    tit.setMandatory(false);
    ZDK.Page.getField('Roles_s').setValue([]);
    // ZDK.Page.getField('File_Number').setValue(null);
    // ZDK.Page.getField('Provide_UID_Number').setValue(null);
    // ZDK.Page.getField('Father_s_First_Name').setValue("");
    // ZDK.Page.getField('Father_s_Middle_Name').setValue("");
    // ZDK.Page.getField('Father_s_Last_Name').setValue("");
    // ZDK.Page.getField('Country_of_Birth').setValue("");
    // ZDK.Page.getField('Provide_UID_Number').setValue("");
    ZDK.Page.getField('Passport_Issued_Date').setValue("");
    ZDK.Page.getField('Passport_Expiry_Date').setValue("");
    ZDK.Page.getField('Title').setValue("");
    ZDK.Page.getField('First_Name').setValue("");
    ZDK.Page.getField('Middle_Name').setValue("");
    ZDK.Page.getField('Gender').setValue("");
    ZDK.Page.getField('Email').setValue("");
    ZDK.Page.getField('Date_of_Birth').setValue("");
    ZDK.Page.getField('Nationality').setValue("");
    ZDK.Page.getField('Mobile').setValue("");
    ZDK.Page.getField('Name').setValue("");
    ZDK.Page.getField('Passport_Number').setValue("");
    ZDK.Page.getField('Passport_Country_of_Issue').setValue("");
    ZDK.Page.getField('Passport_Place_of_Issue').setValue("");
    ZDK.Page.getField('UAE_Resident').setValue("");
    ZDK.Page.getField('Emirates_ID_Number').setValue(null);
    ZDK.Page.getField('Address_Line_1').setValue("");
    ZDK.Page.getField('Address_Line_2').setValue("");
    ZDK.Page.getField('City').setValue("");
    ZDK.Page.getField('State_Province').setValue("");
    ZDK.Page.getField('PO_Box').setValue("");
    ZDK.Page.getField('Postal_Code').setValue("");
    ZDK.Page.getField('Country').setValue("");
    ZDK.Page.getField('Last_Name').setValue(null);
}
if (record_number.includes("M") || record_number.includes("m"))
{
    var company_members_details = ZDK.Apps.CRM.Company_Members.searchByCriteria("((Auto_Number_1:equals:"+record_number+"))");
    company_member_result = JSON.stringify(company_members_details[0]);
    log("Company Member Result: " +company_member_result);
    if (company_member_result != undefined)
    {
        json_company_member_result = JSON.parse(company_member_result);
        birthdate = new Date(json_company_member_result._Date_of_Birth).toLocaleDateString('en-GB');
        passport_issued = new Date(json_company_member_result._Passport_Issued_Date).toLocaleDateString('en-GB');
        passport_expiry = new Date(json_company_member_result._Passport_Expiry_Date).toLocaleDateString('en-GB');
        var fullname = json_company_member_result._First_Name + " " + json_company_member_result._Last_Name;
        var passport =  json_company_member_result._Passport_Number;
        if (passport != null)
        {
            ZDK.Page.getField('First_Name').setValue(json_company_member_result._First_Name);
            ZDK.Page.getField('Middle_Name').setValue(json_company_member_result._Middle_Name);
            ZDK.Page.getField('Last_Name').setValue(json_company_member_result._Last_Name);
            ZDK.Page.getField('Gender').setValue(json_company_member_result._Gender);
            ZDK.Page.getField('Email').setValue(json_company_member_result._Email);
            ZDK.Page.getField('Nationality').setValue(json_company_member_result._Nationality);
            ZDK.Page.getField('Mobile').setValue(json_company_member_result._Mobile);
            ZDK.Page.getField('Name').setValue(fullname);
            // ZDK.Page.getField('Roles_s').setValue(json_company_member_result._Roles_s);
            ZDK.Page.getField('Passport_Number').setValue(json_company_member_result._Passport_Number);
            ZDK.Page.getField('Passport_Country_of_Issue').setValue(json_company_member_result._Passport_Country_of_Issue);
            ZDK.Page.getField('Passport_Place_of_Issue').setValue(json_company_member_result._Passport_Place_of_Issue);
            ZDK.Page.getField('UAE_Resident').setValue(json_company_member_result._UAE_Resident);
            ZDK.Page.getField('Emirates_ID_Number').setValue(json_company_member_result._Emirates_ID_Number);
            ZDK.Page.getField('Address_Line_1').setValue(json_company_member_result._Address_Line_1);
            ZDK.Page.getField('Address_Line_2').setValue(json_company_member_result._Address_Line_2);
            ZDK.Page.getField('City').setValue(json_company_member_result._City);
            ZDK.Page.getField('State_Province').setValue(json_company_member_result._State_Province);
            ZDK.Page.getField('PO_Box').setValue(json_company_member_result._PO_Box);
            ZDK.Page.getField('Postal_Code').setValue(json_company_member_result._Postal_Code);
            ZDK.Page.getField('Country').setValue(json_company_member_result._Country);
            ZDK.Page.getField('Title').setValue(json_company_member_result._Title);
            // ZDK.Page.getField('File_Number').setValue(json_company_member_result._File_Number);
            // ZDK.Page.getField('Provide_UID_Number').setValue(json_company_member_result._Provide_UID_Number);
            // ZDK.Page.getField('Country_of_Birth').setValue(json_company_member_result._Country_of_Birth);
            // ZDK.Page.getField('Father_s_First_Name').setValue(json_company_member_result._Father_s_First_Name);
            // ZDK.Page.getField('Father_s_Middle_Name').setValue(json_company_member_result._Father_s_Middle_Name);
            // ZDK.Page.getField('Father_s_Last_Name').setValue(json_company_member_result._Father_s_Last_Name); 
            //Passport Expiry date validation
            if ( passport_expiry != '01/01/1970' )
            {
                 log("Passport Expiry:" + passport_expiry)
                 ZDK.Page.getField('Passport_Expiry_Date').setValue(passport_expiry);
            }
            else
            {
                 ZDK.Page.getField('Passport_Expiry_Date').setValue("");
            }

            //Passport Issued date validation
            if ( passport_issued != '01/01/1970' )
            {
                
                ZDK.Page.getField('Passport_Issued_Date').setValue(passport_issued);
            }
            else
            {
                ZDK.Page.getField('Passport_Issued_Date').setValue("");
            }

            //Birthdate validation
            if (birthdate !=  '01/01/1970')
            {
                ZDK.Page.getField('Date_of_Birth').setValue(birthdate);
            }
            else
            {
                ZDK.Page.getField('Date_of_Birth').setValue("");
            }
            
        }
        else
        {
            log("nothing");
            ZDK.Client.showAlert('Passport Number is Empty'); 
            ZDK.Page.getField('Member_Record_Number').setValue("");
        }
    }
    else
    {
        tit.setMandatory(false);
        ZDK.Page.getField('Roles_s').setValue([]);
        // ZDK.Page.getField('File_Number').setValue(null);
        // ZDK.Page.getField('Provide_UID_Number').setValue(null);
        // ZDK.Page.getField('Father_s_First_Name').setValue("");
        // ZDK.Page.getField('Father_s_Middle_Name').setValue("");
        // ZDK.Page.getField('Father_s_Last_Name').setValue("");
        // ZDK.Page.getField('Country_of_Birth').setValue("");
        // ZDK.Page.getField('Provide_UID_Number').setValue("");
        ZDK.Page.getField('Number_of_Shares').setValue(null);
        ZDK.Page.getField('Passport_Issued_Date').setValue("");
        ZDK.Page.getField('Passport_Expiry_Date').setValue("");
        ZDK.Page.getField('Title').setValue("");
        ZDK.Page.getField('First_Name').setValue("");
        ZDK.Page.getField('Middle_Name').setValue("");
        ZDK.Page.getField('Gender').setValue("");
        ZDK.Page.getField('Email').setValue("");
        ZDK.Page.getField('Date_of_Birth').setValue("");
        ZDK.Page.getField('Nationality').setValue("");
        ZDK.Page.getField('Mobile').setValue("");
        ZDK.Page.getField('Name').setValue("");
        ZDK.Page.getField('Passport_Number').setValue("");
        ZDK.Page.getField('Passport_Country_of_Issue').setValue("");
        ZDK.Page.getField('Passport_Place_of_Issue').setValue("");
        ZDK.Page.getField('UAE_Resident').setValue("");
        ZDK.Page.getField('Emirates_ID_Number').setValue(null);
        ZDK.Page.getField('Address_Line_1').setValue("");
        ZDK.Page.getField('Address_Line_2').setValue("");
        ZDK.Page.getField('City').setValue("");
        ZDK.Page.getField('State_Province').setValue("");
        ZDK.Page.getField('PO_Box').setValue("");
        ZDK.Page.getField('Postal_Code').setValue("");
        ZDK.Page.getField('Country').setValue("");
        ZDK.Page.getField('Last_Name').setValue(null);
    }
}

if (record_number.includes("Contact") || record_number.includes("contact")) 
{
    var contact_details = ZDK.Apps.CRM.Contacts.searchByCriteria("((Contacts_Control_Number:equals:" + record_number + "))");
    log("Contact Details: " + contact_details)
    var contact_details_result = JSON.stringify(contact_details[0]);
    log("Contact Details Result: " + contact_details_result);
    if (contact_details_result != undefined)
    {
        var json_contact_details_result = JSON.parse(contact_details_result);
        var birthdate = new Date(json_contact_details_result._Date_of_Birth).toLocaleDateString('en-GB');
        var p_issued_date = new Date(json_contact_details_result._PP_Issue_Date).toLocaleDateString('en-GB');
        var p_expiry_date = new Date(json_contact_details_result._PP_Expiry_Date).toLocaleDateString('en-GB');
        var fullname = json_contact_details_result._First_Name + " " + json_contact_details_result._Last_Name;
        log("Full Name: " + json_contact_details_result)
        var passport = json_contact_details_result._PP_Number;
        if (passport != null)
        {
            ZDK.Page.getField('First_Name').setValue(json_contact_details_result._First_Name);
            ZDK.Page.getField('Last_Name').setValue(json_contact_details_result._Last_Name);
            ZDK.Page.getField('Gender').setValue(json_contact_details_result._Gender);
            ZDK.Page.getField('Nationality').setValue(json_contact_details_result._Nationality);
            ZDK.Page.getField('Mobile').setValue(json_contact_details_result._Mobile)
            ZDK.Page.getField('Name').setValue(fullname);
            ZDK.Page.getField('Passport_Number').setValue(json_contact_details_result._PP_Number);
            ZDK.Page.getField('Title').setValue(json_contact_details_result._Salutation);
            ZDK.Page.getField('Email').setValue(json_contact_details_result._Email);
            ZDK.Page.getField('Passport_Country_of_Issue').setValue(json_contact_details_result._PP_Issuing_Country_new);

            //Passport Issued Date validation
            if (p_issued_date != '01/01/1970')
            {
                ZDK.Page.getField('Passport_Issued_Date').setValue(p_issued_date);
            }
            else
            {
                ZDK.Page.getField('Passport_Issued_Date').setValue("");
            }

            //Passport Expiry Date validation
            if (p_expiry_date != '01/01/1970')
            {
                ZDK.Page.getField('Passport_Expiry_Date').setValue(p_expiry_date);
            }
            else
            {
                ZDK.Page.getField('Passport_Expiry_Date').setValue("");
            }

            //Passport birtdate validation
            if (birthdate != '01/01/1970')
            {
                ZDK.Page.getField('Date_of_Birth').setValue(birthdate);
            }
            else
            {
                ZDK.Page.getField('Date_of_Birth').setValue("");
            }
        }
        else
        {
            log("nothing");
            ZDK.Client.showAlert('Passport Number is Empty'); 
            ZDK.Page.getField('Member_Record_Number').setValue("");
        }  
    }
    else
    {
        tit.setMandatory(false);
        ZDK.Page.getField('Roles_s').setValue([]);
        // ZDK.Page.getField('File_Number').setValue(null);
        // ZDK.Page.getField('Provide_UID_Number').setValue(null);
        // ZDK.Page.getField('Father_s_First_Name').setValue("");
        // ZDK.Page.getField('Father_s_Middle_Name').setValue("");
        // ZDK.Page.getField('Father_s_Last_Name').setValue("");
        // ZDK.Page.getField('Country_of_Birth').setValue("");
        // ZDK.Page.getField('Provide_UID_Number').setValue("");
        ZDK.Page.getField('Number_of_Shares').setValue(null);
        ZDK.Page.getField('Passport_Issued_Date').setValue("");
        ZDK.Page.getField('Passport_Expiry_Date').setValue("");
        ZDK.Page.getField('Title').setValue("");
        ZDK.Page.getField('First_Name').setValue("");
        ZDK.Page.getField('Middle_Name').setValue("");
        ZDK.Page.getField('Gender').setValue("");
        ZDK.Page.getField('Email').setValue("");
        ZDK.Page.getField('Date_of_Birth').setValue("");
        ZDK.Page.getField('Nationality').setValue("");
        ZDK.Page.getField('Mobile').setValue("");
        ZDK.Page.getField('Name').setValue("");
        ZDK.Page.getField('Passport_Number').setValue("");
        ZDK.Page.getField('Passport_Country_of_Issue').setValue("");
        ZDK.Page.getField('Passport_Place_of_Issue').setValue("");
        ZDK.Page.getField('UAE_Resident').setValue(""); 
        ZDK.Page.getField('Emirates_ID_Number').setValue(null);
        ZDK.Page.getField('Address_Line_1').setValue("");
        ZDK.Page.getField('Address_Line_2').setValue("");
        ZDK.Page.getField('City').setValue("");
        ZDK.Page.getField('State_Province').setValue("");
        ZDK.Page.getField('PO_Box').setValue("");
        ZDK.Page.getField('Postal_Code').setValue("");
        ZDK.Page.getField('Country').setValue("");
        ZDK.Page.getField('Last_Name').setValue(null);
    }

}